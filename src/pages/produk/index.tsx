import { useRouter } from "next/router";
import { useEffect, useState } from "react";

type ProductType = {
  id: string;
  name: string;
  price: number;
  size: string;
  kategori: string;
};

const Kategori = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Fungsi fetch dipisah agar bisa dipanggil berulang kali
  const fetchProducts = () => {
    setIsLoading(true);
    fetch("/api/produk")
      .then((response) => response.json())
      .then((responsedata) => {
        console.log("Data produk:", responsedata.data);
        setProducts(responsedata.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching produk:", error);
        setIsLoading(false);
      });
  };

  // 2. Memanggil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchProducts();
  }, []);

  const titleStyle = { fontSize: "2rem", fontWeight: "bold", marginBottom: "1rem" };
  const productNameStyle = { fontSize: "1.2rem", fontWeight: "bold" };
  const buttonStyle = {
    padding: "8px 16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    marginBottom: "20px"
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={titleStyle}>Daftar Produk</h1>

      {/* 3. Tombol Refresh Data */}
      <button 
        style={buttonStyle} 
        onClick={fetchProducts} 
        disabled={isLoading}
      >
        {isLoading ? "Sedang Memuat..." : "Refresh Data"}
      </button>

      {products.map((product: ProductType) => (
        <div key={product.id} style={{ marginBottom: "1.5rem", borderBottom: "1px solid #eee" }}>
          <h2 style={productNameStyle}>{product.name}</h2>
          <p>Harga: {product.price}</p>
          <p>Ukuran: {product.size}</p>
          <p>Kategori: {product.kategori}</p>
        </div>
      ))}
    </div>
  );
};

export default Kategori;