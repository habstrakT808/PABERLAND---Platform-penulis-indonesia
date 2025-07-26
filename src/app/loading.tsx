export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-pink-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Memuat Halaman
          </h1>

          <p className="text-gray-600 mb-8">
            Mohon tunggu sebentar, kami sedang memuat konten untuk Anda.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-center space-x-2">
            <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-blue-100">
          <p className="text-sm text-gray-500">
            PaberLand - Platform Komunitas Penulis Indonesia
          </p>
        </div>
      </div>
    </div>
  );
}
