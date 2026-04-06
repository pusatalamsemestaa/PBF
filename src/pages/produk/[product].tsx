import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "../../utils/swr/fetcher";
import DetailProduk from "@/views/DetailProduct";

const HalamanProduk = () => {
  const { query, isReady } = useRouter();
  
  // Ambil ID dari query.product (sesuai nama file [product].tsx)
  const productId = query.product;

  const { data, error, isLoading } = useSWR(
    // PERBAIKAN: Gunakan productId, bukan query.productId
    isReady && productId ? `/api/produk/${productId}` : null, 
    fetcher
  );

  // Jangan lupa kembalikan tampilan (return)
  if (isLoading) return <div className="text-white text-center">Loading...</div>;
  if (!data?.data) return <div className="text-white text-center">Produk tidak ditemukan</div>;

  return (
    <div>
      <DetailProduk products={data.data} />
    </div>
  );
};

export default HalamanProduk;
