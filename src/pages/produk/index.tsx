import TampilanProduk from "@/views/products";
import { useEffect, useState } from "react";
import {useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/swr/fetcher";

const KategoriPage = () => {
  const [products, setProducts] = useState([]);
  // Refactor dari useEffect ke SWR sesuai instruksi tugas
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  if (error) return <div style={{ color: 'white', textAlign: 'center' }}>Gagal memuat data.</div>;

  return (
    <div>
      {/* Kirim status isLoading agar skeleton bisa muncul */}
      <TampilanProduk 
        products={data?.data || []} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default KategoriPage;