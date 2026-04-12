import Link from "next/link";
import style from "../../auth/login/login.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";
const TampilanLogin = () => {
  // Integrasi state dan router
  const [isLoading, setIsLoading] = useState(false);
  const { push, query} = useRouter();
  
const callbackUrl: any = query.callbackUrl || "/";
const [error, setError] = useState("");

const handleSubmit = async (event: any) => {
  event.preventDefault();
  setError("");
  setIsLoading(true);

  try {
    const res = await signIn("credentials", {
      redirect: false,
      email: event.target.email.value,
      password: event.target.password.value,
    });

    if (!res?.error) {
      const session = await getSession(); // 🔥 ambil session

      console.log("SESSION:", session); // debug

      setIsLoading(false);

      if (session?.user?.role === "admin") {
        push("/admin"); // ✅ admin ke sini
      } else {
        push("/dashboard"); // ✅ user ke sini
      }
    } else {
      setIsLoading(false);
      setError(res?.error || "Login failed");
    }
  } catch (error) {
    setIsLoading(false);
    setError("wrong email or password");
  }
};

  return (
    <div className={style.login}>
      {error && <p className={style.login__error}>{error}</p>}
      <h1 className={style.login__title}>Halaman login</h1>
      
      <div className={style.login__form}>
        {/* Menampilkan pesan error jika ada */}
        {error && (
          <p style={{ color: "red", fontSize: "12px", marginBottom: "10px", textAlign: "center" }}>
            {error}
          </p>
        )}

        {/* Menambahkan onSubmit ke dalam form */}
        <form onSubmit={handleSubmit}>
          
          {/* Input Email */}
          <div className={style.login__form__item}>
            <label
              htmlFor="email"
              className={style.login__form__item__label}
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Email"
              className={style.login__form__item__input}
              required
            />
          </div>

          {/* Input Password */}
          <div className={style.login__form__item}>
            <label
              htmlFor="Password"
              className={style.login__form__item__label}
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="password"
              className={style.login__form__item__input}
            />
          </div>

          <button 
            type="submit" 
            className={style.login__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "login"}
          </button>

        <br /> <br />
          <button
            onClick={() => signIn("google", { callbackUrl, redirect: false })}
            className={style.login_form__item__button}
            disabled={isLoading}
            >
               {isLoading ? "Loading..." : "sign in with google"}
          </button>


        </form>
      </div>

      <p className={style.login__link}>
        tidak punya {""} akun? <Link href="/auth/register">Ke Halaman Register</Link>
      </p>
    </div>
  );
};

export default TampilanLogin;