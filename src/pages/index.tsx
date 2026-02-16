import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

//1. Import komponen link dari next/link
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>

    <Head>
      <title>Praktikum Next.js</title>
    </Head>  

      <h1>Selamat Datang di Halaman Utama!</h1>
      <p>Mahasiswa D4 Pengembangan Web Berbasis FrameWork</p>

   {/* 2. Tambahkan Navigasi ke Halaman About */}
      <nav style={{ marginTop: '20px' }}>
        <Link href="/api/about" style={{ color: 'blue', textDecoration: 'underline' }}>
          Lihat Halaman About (API)
        </Link>
      </nav>
    </div> 
  )
}
