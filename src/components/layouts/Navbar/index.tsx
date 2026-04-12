import { signIn, signOut, useSession } from 'next-auth/react';
import styles from './navbar.module.css';


const Navbar = () => {
  const { data } = useSession();
  return (
    <div className={styles.navbar}>
        <div className={styles.navbar__brand}>
          MyApp 
          </div>

         <div className={styles.navbar__right}>
  {data ? (
    <>
      <div className={styles.navbar__user}>
        Welcome, {data.user?.fullname}!
        {data.user.image && (
  <img
    src={data.user.image}
    // Tambahkan "|| ''" untuk memastikan nilainya string kosong jika null
    alt={data.user.fullname || 'User Profile'} 
    className={styles.navbar__user__image}
  />
)}
      </div>
      <button
        className={`${styles.navbar__button} ${styles["navbar__button--danger"]}`}
        onClick={() => signOut()}
      >
        Sign Out
      </button>
    </>
  ) : (
    <button
      className={`${styles.navbar__button} ${styles["navbar__button--primary"]}`}
      onClick={() => signIn()}
    >
      Sign In
    </button>
  )}
</div>
    </div>
    );
};

export default Navbar;