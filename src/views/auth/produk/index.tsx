// index.js atau produk.js
import { useRouter } from "next/router";
import ProdukMain from "./produkMain";
import styles from "./produk.module.scss";
// Import ProductType agar data konsisten
import { ProductType } from "@/types/Product.type";

const HalamanProduk = () => {
  const { push } = useRouter();

  // Data disesuaikan dengan ProductType (name, price: number, image, category)
  const dataProduk: ProductType[] = [
    {
      id: "1",
      name: "Adidas Samba OG",
      price: 2200000,
      image: "https://media.sivasdescalzo.com/media/catalog/product/B/7/B75806_sivasdescalzo-adidas-SAMBA_OG-1670001647-2.jpg",
      category: "Sneakers",
    },
    {
      id: "2",
      name: "Puma SpeedCat",
      price: 2100000,
      image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_706,h_706/global/398846/01/sv04/fnd/ARE/fmt/png/",
      category: "Sneakers",
    },
    {
      id: "3",
      name: "Nike P6000",
      price: 1850000,
      image: "https://th.bing.com/th/id/OIP.bb3CPIdj5Yy",
      category: "Sneakers",
    },
    {
      id: "4",
      name: "Converse Chuck Taylor",
      price: 800000,
      image: "https://th.bing.com/th/id/OIP.kRiBCIZ4pzg",
      category: "Sneakers",
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
            className="text-red-500 border border-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-8">Pilih sepatu favoritmu lalu buka detail untuk info lengkap.</p>

        {/* Kirim dataProduk yang sudah sinkron ke komponen ProdukMain */}
        <ProdukMain listProduk={dataProduk} />
      </div>
    </div>
  );
};

export default HalamanProduk;