import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TampilanProduk from "@/views/products";
import useSWR from "swr";
import fetcher from "../utils/swr/fetcher";

// const fetcher = (url: string) => fetch(url).then((res) => res.json());
// Windsurf Refactor | Explain | X
const kategori = () => {
  const { data, error, isLoading } = useSWR("/api/produk", fetcher);

  // Jika error, tampilkan pesan error sederhana agar tidak stuck hitam
  if (error) return <div>Gagal memuat data.</div>;

  return (
    <div>
      {/* Jika loading, kirim array kosong. Jika tidak, ambil data.data dengan aman */}
      <TampilanProduk products={isLoading ? [] : (data?.data || [])} />
    </div>
  );
};
export default kategori;
