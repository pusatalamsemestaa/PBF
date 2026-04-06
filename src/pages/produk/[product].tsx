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

//export async function getServerSideProps({ params }: { params: { product: string } }) {
  // params.product didapat dari nama file [product].tsx
  //try {
    //const res = await fetch(`http://localhost:3000/api/produk/${params.product}`);
    //const response = await res.json();

    //return {
      //props: {
        //product: response.data || null,
      //},
    //};
  //} catch (error) {
    //return {
      //props: { product: null },
    //};
  //}
//}

export async function getStaticPaths() {
  const res = await fetch('http://localhost:3000/api/produk');
  const response = await res.json();

  const paths = response.data.map((product: ProductType) => ({
    // PERBAIKAN: Harus 'product' (tanpa k) sesuai nama file [product].tsx
    params: { product: product.id } 
  }));

  return {
    paths,
    fallback: false // Gunakan 'blocking' agar produk baru di Firebase tetap bisa diakses
  };
}

// src/pages/produk/[product].tsx

export async function getStaticProps({ params }: { params: { product: string } }) {
  try {
    const res = await fetch(`http://localhost:3000/api/produk/${params?.product}`);
    
    if (!res.ok) throw new Error("Gagal mengambil data");

    const response = await res.json();

    return {
      props: {
        // Ambil data produk tunggal sesuai struktur API kamu
        product: response.data || null, 
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error Detail:", error);
    return { props: { product: null } };
  }
}