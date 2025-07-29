import React from "react";

interface EmailTemplateProps {
  confirmationUrl: string;
  userName?: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({
  confirmationUrl,
  userName,
}) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#f8fafc",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px 12px 0 0",
          padding: "30px",
          textAlign: "center",
          borderBottom: "3px solid #3b82f6",
        }}
      >
        <div
          style={{
            width: "80px",
            height: "80px",
            backgroundColor: "#3b82f6",
            borderRadius: "50%",
            margin: "0 auto 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "40px",
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            ✍️
          </span>
        </div>
        <h1
          style={{
            color: "#1e293b",
            fontSize: "28px",
            margin: "0 0 10px",
            fontWeight: "bold",
          }}
        >
          Selamat Datang di PaberLand!
        </h1>
        <p
          style={{
            color: "#64748b",
            fontSize: "16px",
            margin: "0",
            lineHeight: "1.5",
          }}
        >
          Platform komunitas penulis bacaan anak Indonesia
        </p>
      </div>

      {/* Main Content */}
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: "40px 30px",
          borderLeft: "1px solid #e2e8f0",
          borderRight: "1px solid #e2e8f0",
        }}
      >
        <h2
          style={{
            color: "#1e293b",
            fontSize: "24px",
            margin: "0 0 20px",
            fontWeight: "600",
          }}
        >
          Halo {userName || "Penulis Muda"}! 👋
        </h2>

        <p
          style={{
            color: "#475569",
            fontSize: "16px",
            lineHeight: "1.6",
            margin: "0 0 20px",
          }}
        >
          Terima kasih telah bergabung dengan komunitas PaberLand! Akun Anda
          telah berhasil dibuat dan siap untuk digunakan.
        </p>

        <div
          style={{
            backgroundColor: "#f0f9ff",
            borderRadius: "8px",
            padding: "20px",
            margin: "30px 0",
            borderLeft: "4px solid #3b82f6",
          }}
        >
          <h3
            style={{
              color: "#1e293b",
              fontSize: "18px",
              margin: "0 0 10px",
              fontWeight: "600",
            }}
          >
            🎉 Pendaftaran Berhasil!
          </h3>
          <p
            style={{
              color: "#475569",
              fontSize: "14px",
              margin: "0",
              lineHeight: "1.5",
            }}
          >
            Akun PaberLand Anda telah berhasil dibuat. Sekarang Anda perlu
            memverifikasi email untuk mengaktifkan akun.
          </p>
        </div>

        {/* Verifikasi Button */}
        <div style={{ textAlign: "center", margin: "40px 0" }}>
          <a
            href={confirmationUrl}
            style={{
              display: "inline-block",
              backgroundColor: "#10b981",
              color: "#ffffff",
              padding: "16px 32px",
              borderRadius: "8px",
              textDecoration: "none",
              fontSize: "16px",
              fontWeight: "600",
              boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.3)",
              transition: "all 0.3s ease",
            }}
          >
            ✅ Verifikasi Email
          </a>
        </div>

        <div
          style={{
            backgroundColor: "#f1f5f9",
            borderRadius: "8px",
            padding: "20px",
            margin: "30px 0",
            borderLeft: "4px solid #10b981",
          }}
        >
          <h3
            style={{
              color: "#1e293b",
              fontSize: "18px",
              margin: "0 0 10px",
              fontWeight: "600",
            }}
          >
            🔐 Setelah Verifikasi
          </h3>
          <p
            style={{
              color: "#475569",
              fontSize: "14px",
              margin: "0",
              lineHeight: "1.5",
            }}
          >
            Setelah verifikasi berhasil, Anda akan melihat halaman "Terima
            kasih" dan dapat langsung login ke PaberLand.
          </p>
        </div>

        <div
          style={{
            textAlign: "center",
            margin: "40px 0",
            padding: "20px",
            backgroundColor: "#f8fafc",
            borderRadius: "8px",
          }}
        >
          <p
            style={{
              color: "#64748b",
              fontSize: "16px",
              margin: "0 0 15px",
              fontWeight: "600",
            }}
          >
            Kunjungi PaberLand untuk Login
          </p>
          <p
            style={{
              color: "#64748b",
              fontSize: "14px",
              margin: "0",
              lineHeight: "1.5",
            }}
          >
            <a
              href="https://paberland.vercel.app"
              style={{
                color: "#3b82f6",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              https://paberland.vercel.app
            </a>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "0 0 12px 12px",
          padding: "30px",
          textAlign: "center",
          borderTop: "1px solid #e2e8f0",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#f1f5f9",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "20px" }}>📚</span>
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#f1f5f9",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "20px" }}>✍️</span>
          </div>
          <div
            style={{
              width: "40px",
              height: "40px",
              backgroundColor: "#f1f5f9",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "20px" }}>🌟</span>
          </div>
        </div>

        <p
          style={{
            color: "#64748b",
            fontSize: "14px",
            margin: "0 0 10px",
            lineHeight: "1.5",
          }}
        >
          Bergabunglah dengan ribuan penulis Indonesia lainnya dalam membangun
          literasi yang lebih baik.
        </p>

        <p
          style={{
            color: "#94a3b8",
            fontSize: "12px",
            margin: "0",
            lineHeight: "1.4",
          }}
        >
          Email ini dikirim dari aplikasi yang didukung oleh Supabase.
          <br />
          Jika Anda tidak mendaftar di PaberLand, abaikan email ini.
        </p>
      </div>
    </div>
  );
};

export default EmailTemplate;
