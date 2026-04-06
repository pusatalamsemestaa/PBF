import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  revalidated: boolean;
  message?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // 1. Validasi Token Keamanan
  if (req.query.token !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({
      revalidated: false,
      message: "Insert correct token",
    });
  }

  // 2. Logika On-Demand Revalidation
  try {
    if (req.query.data === "produk") {
      // Revalidate halaman list produk (Static)
      await res.revalidate("/produk/static");
      
      // Jika Anda juga ingin me-revalidate detail produk tertentu (opsional)
      // Contoh URL: ?data=produk&slug=nike-cortez
      if (req.query.slug) {
        await res.revalidate(`/produk/${req.query.slug}`);
      }

      return res.status(200).json({ 
        revalidated: true, 
        message: `Revalidation success for ${req.query.slug ? req.query.slug : 'halaman produk static'}` 
      });
    }

    return res.status(400).json({
      revalidated: false,
      message: "Invalid query parameter. Expected 'data=produk'.",
    });

  } catch (error) {
    console.error("Revalidation Error:", error);
    return res.status(500).json({ 
      revalidated: false, 
      message: "Internal Server Error during revalidation" 
    });
  }
}