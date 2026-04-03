import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'


//1. Import komponen link dari next/link
import Link from 'next/link'
import Navbar from '@/components/layouts/Navbar'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div>
      <Head>
        <title>Praktikum Next.js Pages Router</title>
      </Head> 
        <h1>Praktikum Next.js Pages Router</h1>
        <p>Mahasiswa D4 Pengembangan Web Berbasis FrameWork</p>
    </div> 
  )
}
