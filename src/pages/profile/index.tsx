import Link from "next/dist/client/link";

const profile = () => {
  return (
  <div>
    Halaman Profile User
      {/* 2. Tambahkan Navigasi ke Halaman About */}
          <nav style={{ marginTop: '20px' }}>
            <Link href="/profile/edit" style={{ color: 'blue', textDecoration: 'underline' }}>
              Edit Profile
            </Link>
          </nav>
  </div>
  );
};

export default profile; 