import TampilanProduk from "@/views/products";
import { useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/swr/fetcher";

const KategoriPage = () => {
  const { data, isLoading, error } = useSWR("/api/produk", fetcher);

  // Jika terjadi error pada SWR, tampilkan pesan error atau log
  if (error) return <div className="text-white">Gagal memuat data produk.</div>;

  return (
    <div>
      <TampilanProduk 
        // Gunakan optional chaining dan pastikan fallback ke array kosong
        products={data?.data ? data.data : []} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default KategoriPage;