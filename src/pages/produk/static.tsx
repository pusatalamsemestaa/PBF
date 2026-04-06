import TampilanProduk from "@/views/products";
import { ProductType } from "../../types/Product.type";

const halamanProdukStatic = (props: { products: ProductType[] }) => {
  const { products } = props;
  return (
    <div className="min-h-screen bg-black p-8">
      <h1 className="text-white text-2xl font-bold mb-6">Halaman Produk Static</h1>
      <TampilanProduk products={products} isLoading={false} />
    </div>
  );
};

export default halamanProdukStatic;

export async function getStaticProps() {
  try {
    // Data diambil HANYA saat proses 'npm run build'
    const res = await fetch("http://127.0.0.1:3000/api/produk");

    if (!res.ok) {
      throw new Error(`Gagal fetch: ${res.status}`);
    }

    const response: { data: ProductType[] } = await res.json();

    return {
      props: {
        products: response.data || [],
      },
      // Properti 'revalidate' DIHAPUS agar menjadi Pure SSG
    };
  } catch (error) {
    console.error("Build Error:", error);
    return {
      props: {
        products: [],
      },
      revalidate: 10, // Tetap gunakan revalidate untuk menangani error saat build
    };
  }
}