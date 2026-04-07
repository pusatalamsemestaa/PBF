import Link from "next/link";
import style from "../../auth/register/register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
  // Integrasi state dan router
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const [error, setError] = useState("");

  // Fungsi handleSubmit
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true); // Set loading menjadi true saat proses dimulai
    setError(""); // Reset error setiap kali submit

    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const fullname = formData.get("Fullname") as string;
    const password = formData.get("Password") as string;

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, fullname, password }),
      });

      if (response.status === 200) {
        form.reset();
        setIsLoading(false);
        push("/auth/login"); // Pindah ke halaman login jika sukses
      } else {
        setIsLoading(false);
        setError(
          response.status === 400 ? "User already exists" : "An error occurred"
        );
      }
    } catch (err) {
      setIsLoading(false);
      setError("Failed to connect to server");
    }
  };

  return (
    <div className={style.register}>
      <h1 className={style.register__title}>Halaman Register</h1>
      
      <div className={style.register__form}>
        {/* Menampilkan pesan error jika ada */}
        {error && (
          <p style={{ color: "red", fontSize: "12px", marginBottom: "10px", textAlign: "center" }}>
            {error}
          </p>
        )}

        {/* Menambahkan onSubmit ke dalam form */}
        <form onSubmit={handleSubmit}>
          
          {/* Input Email */}
          <div className={style.register__form__item}>
            <label
              htmlFor="email"
              className={style.register__form__item__label}
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className={style.register__form__item__input}
              required
            />
          </div>

          {/* Input Fullname */}
          <div className={style.register__form__item}>
            <label
              htmlFor="Fullname"
              className={style.register__form__item__label}
            >
              Fullname
            </label>
            <input
              type="text"
              id="Fullname"
              name="Fullname"
              placeholder="Fullname"
              className={style.register__form__item__input}
              required
            />
          </div>

          {/* Input Password */}
          <div className={style.register__form__item}>
            <label
              htmlFor="Password"
              className={style.register__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="Password"
              name="Password"
              placeholder="Password"
              className={style.register__form__item__input}
              required
            />
          </div>

          <button 
            type="submit" 
            className={style.register__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Memproses..." : "Register"}
          </button>
        </form>
      </div>

      <p className={style.register__link}>
        Sudah punya akun? <Link href="/auth/login">Ke Halaman Login</Link>
      </p>
    </div>
  );
};

export default TampilanRegister;