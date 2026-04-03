import Link from "next/link";
import { useRouter } from "next/router";

const DetailProduk = () => {
  const router = useRouter();
  const { id } = router.query;

  const dataProduk = [
    {
      id: 1,
      nama: "Adidas Samba",
      harga: "750.000",
      imageUrl: "https://th.bing.com/th/id/OIP.fZRq2nuLDZ6",
      deskripsi: "Sepatu lari ringan dengan bantalan empuk, cocok untuk aktivitas sehari-hari.",
    },
    {
      id: 2,
      nama: "Nike P6000",
      harga: "650.000",
      imageUrl: "https://th.bing.com/th/id/OIP.bb3CPIdj5Yy",
      deskripsi: "Tampilan modern dan casual, nyaman untuk hangout dan aktivitas santai.",
    },
    {
      id: 3,
      nama: "Puma Speedcat",
      harga: "1.250.000",
      imageUrl: "https://th.bing.com/th/id/OIP.etCTadkb4IS",
      deskripsi: "Material kulit elegan untuk penampilan profesional dan acara formal.",
    },
    {
      id: 4,
      nama: "Converse Chuck Taylor",
      harga: "800.000",
      imageUrl: "https://th.bing.com/th/id/OIP.kRiBCIZ4pzg",
      deskripsi: "Sneaker retro dengan gaya klasik, cocok untuk penampilan casual bergaya.",
    },
  ];

  const produk = dataProduk.find((p) => p.id === Number(id));

  if (!produk) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-2xl p-8 text-center max-w-md w-full transform hover:scale-105 transition-transform duration-300">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Produk Tidak Ditemukan</h1>
          <p className="text-gray-600 mb-6 text-lg">Sepatu yang Anda cari tidak tersedia saat ini.</p>
          <Link href="/produk">
            <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 active:bg-blue-700 transition-all duration-200 w-full transform hover:translate-y-0.5">
              Kembali ke Katalog
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Tombol Kembali */}
        <Link href="/produk">
          <button className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-8 transition-all duration-200 transform hover:translate-x-0.5">
            ← Kembali ke Katalog Sepatu
          </button>
        </Link>

        {/* Detail Card dengan shadow dan border */}
        <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            
            {/* Gambar Produk dengan hover effect */}
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden h-96 md:h-full">
              <img
                src={produk.imageUrl}
                alt={produk.nama}
                className="w-full h-full object-cover hover:scale-125 transition-transform duration-700 ease-in-out"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/400x400?text=No+Image";
                }}
              />
            </div>

            {/* Informasi Produk dengan typography */}
            <div className="flex flex-col justify-between">
              <div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {produk.nama}
                </h1>
                
                {/* Harga Section */}
                <div className="mb-10 pb-8 border-b-2 border-gray-300">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">Harga Spesial</p>
                  <p className="text-5xl md:text-6xl font-black text-blue-600">Rp {produk.harga}</p>
                </div>

                {/* Deskripsi Section */}
                <div className="mb-10">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">Deskripsi Produk</p>
                  <p className="text-lg text-gray-700 leading-relaxed line-height-relaxed">
                    {produk.deskripsi}
                  </p>
                </div>
              </div>

              {/* Tombol Aksi dengan full width responsive */}
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button className="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all duration-200 transform hover:translate-y-1 active:translate-y-2 uppercase text-sm tracking-wide">
                  ♥ Simpan
                </button>
                <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg font-bold hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 transition-all duration-200 transform hover:translate-y-1 active:translate-y-2 uppercase text-sm tracking-wide shadow-lg hover:shadow-xl">
                  Beli Sekarang
                </button>
              </div>

              {/* Info Tambahan dengan styling */}
              <div className="mt-10 p-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border-l-4 border-blue-600">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center text-lg">
                  <span className="w-3 h-3 bg-blue-600 rounded-full mr-3"></span>
                  Keuntungan Berbelanja
                </h3>
                <ul className="text-sm text-gray-700 space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">✓</span>
                    <span>Produk Original 100% Bergaransi</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">✓</span>
                    <span>Gratis Ongkos Kirim Seluruh Indonesia</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">✓</span>
                    <span>Garansi Keaslian 30 Hari Uang Kembali</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 font-bold mr-3">✓</span>
                    <span>Cicilan 0% Tersedia Untuk Semua Kartu Kredit</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduk;
