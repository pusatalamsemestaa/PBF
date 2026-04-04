import styles from "@/pages/produk/produk.module.scss";

type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({ products }: { products: ProductType[] }) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>
      <div className={styles.produk__content}>
        {products.length > 0 ? (
          products.map((produk: ProductType) => (
            <div key={produk.id} className={styles.produk__content__item}>
              {/* Konten Produk Asli */}
              <div className={styles.produk__content__item__image}>
                <img src={produk.image} alt={produk.name} width={200} />
              </div>
              <h4 className={styles.produk__content__item__name}>{produk.name}</h4>
              <p className={styles.produk__content__item__category}>{produk.category}</p>
              <p className={styles.produk__content__item__price}>Rp {produk.price.toLocaleString()}</p>
            </div>
          ))
        ) : (
          // Render minimal 4 skeleton agar grid terlihat penuh saat loading
          [1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.produk__content__skeleton}>
              <div className={styles.produk__content__skeleton__image}></div>
              <div className={styles.produk__content__skeleton__name}></div>
              <div className={styles.produk__content__skeleton__category}></div>
              <div className={styles.produk__content__skeleton__price}></div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default TampilanProduk;
