// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveDataByID,retrieveProducts } from "@/utils/db/servicefirebase";

type Data = {
  status: boolean;
  status_code: number;
  data?: any;      // Menggunakan tanda tanya (?) agar opsional saat error
  message?: string; // Tambahkan pesan untuk debugging
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query; // Ini akan jadi array jika pakai [...id]

  // Ambil ID pertama dari array rute dinamis
  const productId = Array.isArray(id) ? id[0] : id;

  // 1. Jika ada productId di URL (contoh: /api/produk/Aznew...)
  if (req.query.produk?.[1]) {
    const data = await retrieveDataByID("products", req.query.produk![1]);
    res.status(200).json({ status: true, status_code: 200, data });
    return;
} else {
    const data = await retrieveProducts("products");
    res.status(200).json({ status: true, status_code: 200, data });
};


  // 2. Jika TIDAK ADA id di URL (contoh: /api/produk)
  const allData = await retrieveProducts("products");
  return res.status(200).json({
    status: true,
    status_code: 200,
    data: allData,
  });
}