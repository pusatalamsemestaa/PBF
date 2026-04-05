import { useRouter } from "next/router";
import ProdukMain from "./produkMain";
import styles from "./produk.module.scss";
import { ProductType } from "@/types/Product.type";

// 1. Tambahkan parameter 'products' yang dikirim dari getServerSideProps
const HalamanProduk = ({ products }: { products: ProductType[] }) => {
  const { push } = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    push('/auth/login');
  };

  return (
    <div className={`${styles.container} min-h-screen bg-black flex flex-col items-center justify-center p-8`}> 
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black">Katalog Sepatu (SSR Mode)</h1>
          <button
            onClick={handleLogout}
            className="text-red-500 border border-red-500 px-4 py-2 rounded-lg font-semibold hover:bg-red-50 transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-8">Data ini diambil secara real-time dari server setiap kali halaman dimuat.</p>

        {/* 2. Gunakan data 'products' yang datang dari server */}
        <ProdukMain listProduk={products} />
      </div>
    </div>
  );
};

// 3. Implementasi getServerSideProps untuk logika SSR
export async function getServerSideProps() {
  try {
    // Memanggil API lokal atau external
    const res = await fetch("http://127.0.0.1:3000/api/produk");
    const response = await res.json();

    // Mengirimkan data ke komponen sebagai props
    return {
      props: {
        products: response.data || [],
      },
    };
  } catch (error) {
    console.error("Gagal mengambil data SSR:", error);
    return {
      props: {
        products: [], // Fallback jika API error
      },
    };
  }
}

export default HalamanProduk;