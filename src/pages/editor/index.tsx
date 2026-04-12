import { useSession } from "next-auth/react";

export default function EditorPage() {
  const { data } = useSession();

  const user = data?.user as { 
    name?: string | null; 
    email?: string | null; 
    image?: string | null; 
    role?: string | null 
  };

  if (user?.role !== "editor") {
    return <h1>Akses Ditolak</h1>;
  }

  return (
    <div>
      <h1>Halaman Editor</h1>
      <p>Selamat datang editor</p>
    </div>
  );
}
