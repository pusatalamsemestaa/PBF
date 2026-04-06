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

export async function getStaticProps({ params }: { params: { product: string } }) {
  try {
    const res = await fetch(`http://localhost:3000/api/produk/${params?.product}`);
    const response = await res.json();

    return {
      props: {
        // Jika API detail mengembalikan satu objek produk
        product: response.data || null, 
      },
      revalidate: 10, // ISR Aktif
    };
  } catch (error) {
    return { props: { product: null }, revalidate: 10 };
  }
}