import DetailProduk from "@/views/DetailProduct";
import { ProductType } from "../../types/Product.type";

const HalamanDetailProduk = ({ product }: { product: ProductType }) => {
  // Jika product null (tidak ditemukan di API)
  if (!product) {
    return <div className="text-white text-center p-10">Produk tidak ditemukan</div>;
  }

  return (
    <div>
      {/* Kirim data ke view detail */}
      <DetailProduk products={product} />
    </div>
  );
};

export default HalamanDetailProduk;

export async function getServerSideProps({ params }: { params: { product: string } }) {
  // params.product didapat dari nama file [product].tsx
  try {
    const res = await fetch(`http://localhost:3000/api/produk/${params.product}`);
    const response = await res.json();

    return {
      props: {
        product: response.data || null,
      },
    };
  } catch (error) {
    return {
      props: { product: null },
    };
  }
}