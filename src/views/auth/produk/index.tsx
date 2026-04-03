// index.js atau produk.js
import { useRouter } from "next/router";
import ProdukMain from "./produkMain";
import styles from "./produk.module.scss";

const HalamanProduk = () => {
  const { push } = useRouter();

  // Data produk sepatu (lebih sederhana)
  const dataProduk = [
  {
    id: 1,
    nama: "Adidas Samba",
    harga: "750.000",
    // Gunakan direct link gambar yang Anda dapatkan
    imageUrl: "https://sl.bing.net/fpcYBAi1Tqu/OIP.contoh-gambar-adidas.jpg", 
  },
  {
    id: 2,
    nama: "Nike P6000",
    harga: "650.000",
    imageUrl: "https://th.bing.com/th/id/OIP.contoh-gambar-nike.jpg",
  },
  {
    id: 3,
    nama: "Puma Speedcat",
    harga: "1.250.000",
    imageUrl: "https://th.bing.com/th/id/OIP.contoh-gambar-puma.jpg",
  },
  {
    id: 4,
    nama: "Converse Chuck Taylor",
    harga: "800.000",
    imageUrl: "https://th.bing.com/th/id/OIP.contoh-gambar-converse.jpg",
  },
];

  const handleLogout = () => {
    localStorage.removeItem('token');
    push('/auth/login');
  };

  return (
    <div className={`${styles.container} min-h-screen bg-black flex flex-col items-center justify-center p-8`}> 
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Katalog Sepatu</h1>
          <button
            onClick={handleLogout}
            className="text-red-500 border border-red-500 px-3 py-1 rounded hover:bg-red-50"
          >
            Logout
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-5">Pilih sepatu favoritmu lalu buka detail untuk info lengkap.</p>

        <ProdukMain listProduk={dataProduk} />
      </div>
    </div>
  );
};

export default HalamanProduk;