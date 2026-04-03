import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./register.module.scss";

const halamanRegister = () => {
  const { push } = useRouter();

  const handlerRegister = () => {
    // logika register di sini
    // simulasikan penyimpanan data setelah register berhasil
    try {
      localStorage.setItem('token', 'dummy-token');
    } catch (err) {
      console.warn('Tidak bisa mengakses localStorage', err);
    }
    push('/produk');
  };

  return (
  <div className={styles.register}>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
          Halaman Register
        </h1>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="button"
            onClick={handlerRegister}
            className="bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Sudah punya akun?
        </p>

        <div className="text-center mt-2">
          <Link href="/auth/login" className="text-blue-500 hover:underline">
            Ke Halaman Login
          </Link>
        </div>
      </div>

    </div>
  </div>
  );
};

export default halamanRegister;
