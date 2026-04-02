import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./login.module.css";

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
    <div className={styles.login}>
      <h1>Halaman Login</h1>
      <button onClick={() => handlerLogin()}>Login</button> <br />
      <h1 style={{ color: "red",borderRadius: "10px",padding: "10px",}}>belum punya akun</h1>
      <Link href="/auth/register">Ke Halaman Register</Link>
    </div>
  );
};

export default halamanLogin;
