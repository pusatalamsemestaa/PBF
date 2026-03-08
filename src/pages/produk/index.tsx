import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Produk = () => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();
  const { push } = router;

  useEffect(() => {
    // redirect otomatis jika tidak ada token dalam localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      push('/auth/login');
    } else {
      setIsLogin(true);
    }
  }, [push]);

  return (
    <div>Produk User Page</div>
  );
};

export default Produk;