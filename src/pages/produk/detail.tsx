import Link from "next/link";
import { useRouter } from "next/router";
// Import ProductType agar data sinkron dengan komponen lain
import { ProductType } from "@/types/Product.type";

const DetailProduk = () => {
  const router = useRouter();
  const { id } = router.query;

  // 1. Data disesuaikan dengan ProductType (id: string, name, price: number, image, category)
  // Kita tambahkan properti 'deskripsi' untuk keperluan halaman detail ini saja
  const dataProduk: (ProductType & { deskripsi: string })[] = [
    {
      id: "1",
      name: "Adidas Samba OG",
      price: 2200000,
      image: "https://media.sivasdescalzo.com/media/catalog/product/B/7/B75806_sivasdescalzo-adidas-SAMBA_OG-1670001647-2.jpg",
      category: "Sneakers",
      deskripsi: "Sepatu lari ringan dengan bantalan empuk, cocok untuk aktivitas sehari-hari.",
    },
    {
      id: "2",
      name: "Puma SpeedCat",
      price: 2100000,
      image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_706,h_706/global/398846/01/sv04/fnd/ARE/fmt/png/",
      category: "Sneakers",
      deskripsi: "Tampilan modern dan casual, nyaman untuk hangout dan aktivitas santai.",
    },
    {
      id: "3",
      name: "Nike P6000",
      price: 1850000,
      image: "https://th.bing.com/th/id/OIP.bb3CPIdj5Yy",
      category: "Sneakers",
      deskripsi: "Material kulit elegan untuk penampilan profesional dan acara formal.",
    },
    {
      id: "4",
      name: "Converse Chuck Taylor",
      price: 800000,
      image: "https://th.bing.com/th/id/OIP.kRiBCIZ4pzg",
      category: "Sneakers",
      deskripsi: "Sneaker retro dengan gaya klasik, cocok untuk penampilan casual bergaya.",
    },
  ];

  // 2. Pencarian produk menggunakan String(id) agar cocok dengan ProductType.id
  const produk = dataProduk.find((p) => p.id === String(id));

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
        <Link href="/produk">
          <button className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-8 transition-all duration-200 transform hover:translate-x-0.5">
            ← Kembali ke Katalog Sepatu
          </button>
        </Link>

        <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl overflow-hidden transition-all duration-300 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            
            {/* Menggunakan produk.image */}
            <div className="flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden h-96 md:h-full">
              <img
                src={produk.image}
                alt={produk.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700 ease-in-out"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/400x400?text=No+Image";
                }}
              />
            </div>

            <div className="flex flex-col justify-between">
              <div>
                <p className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-2">{produk.category}</p>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                  {produk.name}
                </h1>
                
                {/* Menggunakan produk.price dengan format ribuan */}
                <div className="mb-10 pb-8 border-b-2 border-gray-300">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-3">Harga Spesial</p>
                  <p className="text-5xl md:text-6xl font-black text-blue-600">
                    Rp {produk.price.toLocaleString("id-ID")}
                  </p>
                </div>

                <div className="mb-10">
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-widest mb-4">Deskripsi Produk</p>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {produk.deskripsi}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button className="flex-1 border-2 border-blue-600 text-blue-600 px-6 py-4 rounded-lg font-bold hover:bg-blue-50 transition-all duration-200 uppercase text-sm tracking-wide">
                  ♥ Simpan
                </button>
                <button className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-lg font-bold hover:from-green-600 hover:to-green-700 shadow-lg uppercase text-sm tracking-wide">
                  Beli Sekarang
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduk;