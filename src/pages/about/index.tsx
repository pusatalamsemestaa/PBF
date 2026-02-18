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
      <title>Praktikum 2 Next.js</title>
    </Head>  

      <h1>ini halaman about</h1>
    </div> 
  )
}
