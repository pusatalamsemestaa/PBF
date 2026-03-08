import Link from "next/link";
import { useRouter } from "next/router";

const halamanLogin = () => {
  const { push } = useRouter();

  const handlerLogin = () => {
    // logika login di sini
    // simulasikan penyimpanan token setelah login berhasil
    try {
      localStorage.setItem('token', 'dummy-token');
    } catch (err) {
      console.warn('Tidak bisa mengakses localStorage', err);
    }
    push('/produk');
  };

  return (
    <div>
      <h1>Halaman Login</h1>
      <button onClick={() => handlerLogin()}>Login</button> <br />
      <Link href="/auth/register">Ke Halaman Register</Link>
    </div>
  );
};

export default halamanLogin;
