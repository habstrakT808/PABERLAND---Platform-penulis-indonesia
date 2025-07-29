// src/app/profile/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeftIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  DocumentTextIcon,
  PhotoIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";
import { supabase, uploadImageToStorage, getAvatarUrl } from "@/lib/supabase";
import { useAuth } from "@/contexts/AuthContext";
import toast from "react-hot-toast";

interface ProfileFormData {
  full_name: string;
  bio: string;
  phone: string;
  avatar_url: string;
  role: string;
  member_id?: string;
  prestasi?: string;
  alamat?: string;
}

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function EditProfilePage() {
  const { user, refreshUser } = useAuth();
  const router = useRouter();

  const [profileData, setProfileData] = useState<ProfileFormData>({
    full_name: "",
    bio: "",
    phone: "",
    avatar_url: "",
    role: "Penulis",
    member_id: "",
    prestasi: "",
    alamat: "",
  });

  const roles = [
    { value: "Penulis", label: "Penulis" },
    { value: "Ilustrator", label: "Ilustrator" },
    { value: "Kreator Buku", label: "Kreator Buku" },
    { value: "Pekerja Buku", label: "Pekerja Buku" },
  ];

  const [passwordData, setPasswordData] = useState<PasswordFormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Avatar upload states
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth/login");
      return;
    }
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
        toast.error("Gagal memuat data profil");
        return;
      }

      setProfileData({
        full_name: data.full_name || "",
        bio: data.bio || "",
        phone: data.phone || "",
        avatar_url: data.avatar_url || "",
        role: data.role || "Penulis",
        member_id: data.member_id || "",
        prestasi: data.prestasi || "",
        alamat: data.alamat || "",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Terjadi kesalahan saat memuat profil");
    } finally {
      setLoading(false);
    }
  };

  const validateProfileForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!profileData.full_name.trim()) {
      newErrors.full_name = "Nama lengkap wajib diisi";
    } else if (profileData.full_name.trim().length < 2) {
      newErrors.full_name = "Nama lengkap minimal 2 karakter";
    } else if (profileData.full_name.trim().length > 100) {
      newErrors.full_name = "Nama lengkap maksimal 100 karakter";
    }

    if (profileData.bio && profileData.bio.length > 500) {
      newErrors.bio = "Bio maksimal 500 karakter";
    }

    if (profileData.phone && !/^[\d\-\+\(\)\s]+$/.test(profileData.phone)) {
      newErrors.phone = "Format nomor telepon tidak valid";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePasswordForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = "Password saat ini wajib diisi";
    }

    if (!passwordData.newPassword) {
      newErrors.newPassword = "Password baru wajib diisi";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password baru minimal 6 karakter";
    }

    if (!passwordData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak cocok";
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      newErrors.newPassword =
        "Password baru harus berbeda dari password saat ini";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast.error("File harus berupa gambar");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
    setUploadingAvatar(true);

    try {
      const filePath = await uploadImageToStorage(file, "avatars");
      if (filePath) {
        setProfileData((prev) => ({ ...prev, avatar_url: filePath }));
        toast.success("Foto profil berhasil diupload!");
      } else {
        toast.error("Gagal upload foto profil");
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Terjadi kesalahan saat upload foto profil");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateProfileForm()) {
      toast.error("Mohon periksa kembali data yang diisi");
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: profileData.full_name.trim(),
          bio: profileData.bio.trim() || null,
          phone: profileData.phone.trim() || null,
          avatar_url: profileData.avatar_url.trim() || null,
          role: profileData.role,
          member_id: profileData.member_id || null,
          prestasi: profileData.prestasi || null,
          alamat: profileData.alamat || null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user!.id);

      if (error) {
        console.error("Error updating profile:", error);
        toast.error("Gagal memperbarui profil");
        return;
      }

      // Update user metadata in auth
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: profileData.full_name.trim(),
          role: profileData.role,
        },
      });

      if (authError) {
        console.warn("Warning updating auth metadata:", authError);
      }

      await refreshUser();
      toast.success("✅ Profil berhasil diperbarui!");

      // Redirect to public profile
      setTimeout(() => {
        router.push(`/profile/${user!.id}`);
      }, 1500);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswordForm()) {
      toast.error("Mohon periksa kembali data yang diisi");
      return;
    }

    setChangingPassword(true);
    try {
      // Update password
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      });

      if (error) {
        console.error("Error updating password:", error);
        if (error.message.includes("same as the old password")) {
          toast.error("Password baru harus berbeda dari password saat ini");
        } else {
          toast.error("Gagal mengubah password. Periksa password saat ini.");
        }
        return;
      }

      toast.success("🔒 Password berhasil diubah!");

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Terjadi kesalahan sistem");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleInputChange = (field: keyof ProfileFormData, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handlePasswordChange = (
    field: keyof PasswordFormData,
    value: string
  ) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-white/95 rounded-xl p-8 border border-blue-100">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">
            Beranda
          </Link>
          <span>/</span>
          <Link href={`/profile/${user?.id}`} className="hover:text-blue-600">
            Profil
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">Edit Profil</span>
        </nav>

        {/* Header */}
        <div className="bg-white/95 rounded-xl shadow-sm p-6 mb-8 border border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <UserIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Edit Profil
                </h1>
                <p className="text-gray-600">
                  Kelola informasi profil dan keamanan akun Anda
                </p>
              </div>
            </div>

            <Link
              href={`/profile/${user?.id}`}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-4 h-4" />
              <span>Kembali</span>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white/95 rounded-xl shadow-sm border border-blue-100">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("profile")}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === "profile"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <UserIcon className="w-4 h-4" />
                <span>Informasi Profil</span>
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === "password"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <EyeIcon className="w-4 h-4" />
                <span>Keamanan</span>
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === "profile" ? (
              /* Profile Form */
              <form onSubmit={handleProfileSubmit} className="space-y-6">
                {/* Avatar Upload Section */}
                <div className="flex items-center space-x-6">
                  <div className="relative">
                    {avatarPreview ? (
                      <Image
                        src={avatarPreview}
                        alt="Avatar Preview"
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                      />
                    ) : profileData.avatar_url ? (
                      <Image
                        src={getAvatarUrl(profileData.avatar_url) || ""}
                        alt="Avatar"
                        width={80}
                        height={80}
                        className="w-20 h-20 rounded-full object-cover border-4 border-blue-100"
                        onError={() => {
                          setProfileData((prev) => ({
                            ...prev,
                            avatar_url: "",
                          }));
                        }}
                      />
                    ) : (
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-2xl border-4 border-blue-100">
                        {profileData.full_name.charAt(0) || "U"}
                      </div>
                    )}
                    {uploadingAvatar && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      Foto Profil
                    </h3>
                    <p className="text-sm text-gray-500">
                      Upload foto profil Anda (JPG, PNG, maksimal 5MB)
                    </p>
                  </div>
                </div>

                {/* Avatar Upload Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <CloudArrowUpIcon className="w-4 h-4 inline mr-2" />
                    Upload Foto Profil
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    disabled={uploadingAvatar}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      uploadingAvatar
                        ? "border-gray-300 bg-gray-100 cursor-not-allowed"
                        : "border-blue-200 bg-white hover:border-blue-300"
                    } text-gray-900`}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Format: JPG, PNG, GIF. Maksimal 5MB
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <UserIcon className="w-4 h-4 inline mr-2" />
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    value={profileData.full_name}
                    onChange={(e) =>
                      handleInputChange("full_name", e.target.value)
                    }
                    placeholder="Masukkan nama lengkap Anda"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.full_name
                        ? "border-red-300 bg-red-50"
                        : "border-blue-200 bg-white"
                    } text-gray-900 placeholder-gray-500`}
                    maxLength={100}
                  />
                  {errors.full_name && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                      {errors.full_name}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {profileData.full_name.length}/100 karakter
                  </p>
                </div>

                {/* Email (Read Only) */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <EnvelopeIcon className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    disabled
                    className="w-full px-4 py-3 border border-blue-200 bg-gray-100 text-gray-500 rounded-lg cursor-not-allowed"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Email tidak dapat diubah
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <PhoneIcon className="w-4 h-4 inline mr-2" />
                    Nomor Telepon
                  </label>
                  <input
                    type="tel"
                    value={profileData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="Masukkan nomor telepon Anda"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.phone
                        ? "border-red-300 bg-red-50"
                        : "border-blue-200 bg-white"
                    } text-gray-900 placeholder-gray-500`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DocumentTextIcon className="w-4 h-4 inline mr-2" />
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                    placeholder="Ceritakan sedikit tentang diri Anda..."
                    rows={4}
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none ${
                      errors.bio
                        ? "border-red-300 bg-red-50"
                        : "border-blue-200 bg-white"
                    } text-gray-900 placeholder-gray-500`}
                    maxLength={500}
                  />
                  {errors.bio && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                      {errors.bio}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-gray-500">
                    {profileData.bio.length}/500 karakter
                  </p>
                </div>

                {/* Member ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member ID
                  </label>
                  <input
                    type="text"
                    value={profileData.member_id}
                    onChange={(e) =>
                      handleInputChange("member_id", e.target.value)
                    }
                    placeholder="Isi Member ID jika ada"
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-blue-200 bg-white text-gray-900 placeholder-gray-500"
                  />
                </div>
                {/* Prestasi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prestasi
                  </label>
                  <textarea
                    value={profileData.prestasi}
                    onChange={(e) =>
                      handleInputChange("prestasi", e.target.value)
                    }
                    placeholder="Tulis prestasi, pisahkan dengan koma jika lebih dari satu"
                    rows={2}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-blue-200 bg-white text-gray-900 placeholder-gray-500 resize-none"
                  />
                </div>
                {/* Alamat */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Alamat
                  </label>
                  <textarea
                    value={profileData.alamat}
                    onChange={(e) =>
                      handleInputChange("alamat", e.target.value)
                    }
                    placeholder="Alamat lengkap"
                    rows={2}
                    className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors border-blue-200 bg-white text-gray-900 placeholder-gray-500 resize-none"
                  />
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <UserIcon className="w-4 h-4 inline mr-2" />
                    Role
                  </label>
                  <select
                    value={profileData.role}
                    onChange={(e) => handleInputChange("role", e.target.value)}
                    className="w-full px-4 py-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                  >
                    {roles.map((role) => (
                      <option key={role.value} value={role.value}>
                        {role.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      saving
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>Simpan Perubahan</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Password Form */
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                {/* Current Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <EyeIcon className="w-4 h-4 inline mr-2" />
                    Password Saat Ini *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.current ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) =>
                        handlePasswordChange("currentPassword", e.target.value)
                      }
                      placeholder="Masukkan password saat ini"
                      className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.currentPassword
                          ? "border-red-300 bg-red-50"
                          : "border-blue-200 bg-white"
                      } text-gray-900 placeholder-gray-500`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("current")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPasswords.current ? (
                        <EyeSlashIcon className="w-4 h-4 text-gray-400" />
                      ) : (
                        <EyeIcon className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <EyeIcon className="w-4 h-4 inline mr-2" />
                    Password Baru *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) =>
                        handlePasswordChange("newPassword", e.target.value)
                      }
                      placeholder="Masukkan password baru"
                      className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.newPassword
                          ? "border-red-300 bg-red-50"
                          : "border-blue-200 bg-white"
                      } text-gray-900 placeholder-gray-500`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("new")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPasswords.new ? (
                        <EyeSlashIcon className="w-4 h-4 text-gray-400" />
                      ) : (
                        <EyeIcon className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <EyeIcon className="w-4 h-4 inline mr-2" />
                    Konfirmasi Password Baru *
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordData.confirmPassword}
                      onChange={(e) =>
                        handlePasswordChange("confirmPassword", e.target.value)
                      }
                      placeholder="Konfirmasi password baru"
                      className={`w-full px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.confirmPassword
                          ? "border-red-300 bg-red-50"
                          : "border-blue-200 bg-white"
                      } text-gray-900 placeholder-gray-500`}
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility("confirm")}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPasswords.confirm ? (
                        <EyeSlashIcon className="w-4 h-4 text-gray-400" />
                      ) : (
                        <EyeIcon className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <ExclamationTriangleIcon className="w-4 h-4 mr-1" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6">
                  <button
                    type="submit"
                    disabled={changingPassword}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                      changingPassword
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {changingPassword ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Mengubah Password...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="w-4 h-4" />
                        <span>Ubah Password</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-medium text-blue-900 mb-2">
            💡 Tips Keamanan
          </h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Gunakan foto profil yang jelas dan profesional</li>
            <li>• Tulis bio yang menarik untuk memperkenalkan diri Anda</li>
            <li>• Gunakan password yang kuat dan unik</li>
            <li>• Jangan bagikan informasi login Anda kepada siapapun</li>
            <li>• Update profil secara berkala untuk menjaga relevansi</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
