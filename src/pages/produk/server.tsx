import TampilanProduk from "@/views/products";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

// Perbaikan pada deklarasi parameter fungsi
const HalamanProdukServer = (props: { products: ProductType[] }) => {
  const { products } = props;

  return (
    <div>
      <h1>Halaman Produk Server</h1>
      {/* Karena ini Server Side Rendering (SSR), data langsung ada.
          Kita set isLoading={false} agar produk langsung muncul.
      */}
      <TampilanProduk products={products} isLoading={false} />
    </div>
  );
};

export default HalamanProdukServer;

export async function getServerSideProps() {
  try {
    const res = await fetch("http://localhost:3000/api/produk");
    
    if (!res.ok) {
      throw new Error("Gagal mengambil data dari API");
    }

    const response = await res.json();

    return {
      props: {
        // Memberikan default array kosong jika data undefined
        products: response.data || [], 
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        products: [],
      },
    };
  }
}