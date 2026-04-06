import TampilanProduk from "@/views/products";
import { useEffect, useState } from "react";
import {useRouter } from "next/router";
import useSWR from "swr";
import fetcher from "@/utils/swr/fetcher";

const KategoriPage = () => {
  const router = useRouter();
  const { data, isLoading } = useSWR("/api/produk", fetcher);

  useEffect(() => {
    // Jika tidak sedang loading dan data ada
    if (!isLoading && data?.data?.length > 0) {
      // OPSI A: Langsung arahkan ke ID spesifik yang kamu mau
      // router.replace("/produk/aGSq2vFs6t1S33GaRvPo");

      // OPSI B: Arahkan ke produk pertama yang ada di Firebase secara otomatis
      router.replace(`/produk/${data.data[0].id}`);
    }
  }, [data, isLoading, router]);

  return <div className="text-white text-center">Mengalihkan...</div>;
};

export default KategoriPage;