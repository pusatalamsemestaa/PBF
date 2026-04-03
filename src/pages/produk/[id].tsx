import Link from "next/link";
import { useRouter } from "next/router";

const DetailProduk = () => {
  const router = useRouter();
  const { id } = router.query;

  const dataProduk = [
    {
      id: 1,
      nama: "Sepatu Olahraga Runner",
      harga: "750.000",
      imageUrl: "https://images.unsplash.com/photo-1528701800489-5fc2b6e8fcad?q=80&w=400&auto=format&fit=crop",
      deskripsi: "Sepatu lari ringa dengan bantalan empuk, cocok digunakan sehari-hari.",
    },
    {
      id: 2,
      nama: "Sepatu Kasual Urban",
      harga: "650.000",
      imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop",
      deskripsi: "Tampilan gaya kasual modern, nyaman untuk kegiatan santai.",
    },
    {
      id: 3,
      nama: "Sepatu Formal Leather",
      harga: "1.250.000",
      imageUrl: "https://images.unsplash.com/photo-1519741498091-32f72dfb5f2b?q=80&w=400&auto=format&fit=crop",
      deskripsi: "Material kulit elegan untuk penampilan profesional.",
    },
    {
      id: 4,
      nama: "Sepatu Sneaker Retro",
      harga: "800.000",
      imageUrl: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?q=80&w=400&auto=format&fit=crop",
      deskripsi: "Sneaker retro dengan warna klasik, cocok untuk gaya vintage.",
    },
  ];

  const produk = dataProduk.find((p) => p.id === Number(id));

  if (!produk) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center text-white bg-gray-900 p-8 rounded-lg shadow-xl border border-red-500">
          <h1 className="text-4xl font-bold mb-4 text-red-500">⚠️ Produk Tidak Ditemukan</h1>
          <p className="text-gray-300 mb-8 text-lg">Maaf, sepatu yang Anda cari tidak tersedia saat ini.</p>
          <Link href="/produk">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-600 hover:to-blue-700 active:from-blue-700 active:to-blue-800 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl uppercase tracking-wide flex items-center justify-center gap-2 mx-auto">
              <span>←</span>
              <span>Kembali ke Katalog</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-6">
      <div className="bg-white text-black rounded-lg shadow-lg max-w-2xl w-full overflow-hidden">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <Link href="/produk" className="text-blue-600 hover:text-blue-800 font-bold transition-colors duration-200 flex items-center gap-2 inline-flex">
            <span>←</span>
            <span>Kembali ke Katalog Sepatu</span>
          </Link>
        </div>

        <div className="p-6">
          <div className="overflow-hidden rounded-lg mb-4">
            <Image
              src={produk.imageUrl}
              alt={produk.nama}
              width={800}
              height={500}
              objectFit="cover"
            />
          </div>

          <h1 className="text-2xl font-bold mb-2">{produk.nama}</h1>
          <p className="text-xl text-blue-600 font-semibold mb-4">Rp {produk.harga}</p>
          <p className="text-gray-700 mb-6">{produk.deskripsi}</p>

          <div className="flex gap-4 flex-col sm:flex-row">
            <button className="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 active:bg-blue-100 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-sm hover:shadow-md uppercase text-sm tracking-wide flex items-center justify-center gap-2">
              <span>♥</span>
              <span>Simpan Favorit</span>
            </button>
            <button className="flex-1 bg-gradient-to-r from-green-500 via-green-600 to-green-700 text-white px-6 py-3 rounded-lg font-bold hover:from-green-600 hover:via-green-700 hover:to-green-800 active:from-green-700 active:via-green-800 active:to-green-900 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl uppercase text-sm tracking-wide flex items-center justify-center gap-2">
              <span>🛒</span>
              <span>Beli Sekarang</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduk;

