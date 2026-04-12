import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image'; // Import komponen Image
import styles from './navbar.module.css';

const Navbar = () => {
  const { data } = useSession();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__brand}>MyApp</div>

      <div className={styles.navbar__right}>
        {data ? (
          <>
            <div className={styles.navbar__user}>
              Welcome, {data.user?.fullname}!
              {data.user.image && (
                <Image
                  src={data.user.image}
                  alt={data.user.fullname || 'User Profile'}
                  width={40}  // Tentukan lebar (sesuaikan CSS Anda)
                  height={40} // Tentukan tinggi (sesuaikan CSS Anda)
                  className={styles.navbar__user__image}
                  referrerPolicy="no-referrer"
                  // Menambahkan unoptimized={true} jika Anda tidak ingin mendaftarkan domain di config
                  // unoptimized 
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