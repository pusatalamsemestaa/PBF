import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Appshell from '@/components/layouts/Appshell'
import Navbar from '@/components/layouts/Navbar'

export default function App({ Component, pageProps }: AppProps) {
  return (
      <Appshell>
      <Component {...pageProps} />
    </Appshell>
  )
}
