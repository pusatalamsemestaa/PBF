// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { signUp } from '@/utils/db/servicefirebase'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
  alamat: string
}

// Di file src/pages/api/auth/register.ts
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // req.body sekarang akan berisi data dari form
    await signUp(req.body, (result: { status: string; message: string }) => {
      if (result.status === "success") {
        return res.status(200).json({ status: true, message: result.message });
      } else {
        return res.status(400).json({ status: false, message: result.message });
      }
    });
  } else {
    res.status(405).json({ status: false, message: "Method not allowed" });
  }
}