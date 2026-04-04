// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { retrieveProducts } from "../utils/db/servicefirebase";

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
  // 1. Validasi Method (Hanya izinkan GET untuk mengambil data)
  if (req.method !== "GET") {
    return res.status(405).json({
      status: false,
      status_code: 405,
      message: "Method Not Allowed",
    });
  }

  try {
    // 2. Ambil data dengan penanganan async/await yang benar
    const data = await retrieveProducts("products");

    // 3. Berikan response sukses
    return res.status(200).json({ 
      status: true, 
      status_code: 200, 
      data 
    });
    
  } catch (error) {
    // 4. Penanganan Error (Jika Firestore gagal diakses)
    console.error("Firestore Error:", error);
    return res.status(500).json({
      status: false,
      status_code: 500,
      message: "Internal Server Error",
    });
  }
}