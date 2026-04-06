import styles from "@/pages/produk/produk.module.scss";
import Link from "next/link";
type ProductType = {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
};

const TampilanProduk = ({ products, isLoading }: { products: ProductType[], isLoading: boolean }) => {
  return (
    <div className={styles.produk}>
      <h1 className={styles.produk__title}>Daftar Produk</h1>
      <div className={styles.produk__content}>
        {isLoading ? (
          // Render 4 skeleton saat loading
          [1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.produk__content__skeleton}>
              <div className={styles.produk__content__skeleton__image} />
              <div className={styles.produk__content__skeleton__name} />
              <div className={styles.produk__content__skeleton__category} />
              <div className={styles.produk__content__skeleton__price} />
            </div>
          ))
        ) : (
          products.map((product : ProductType) => (
           // Di dalam loop products.map
<Link href={`/produk/${product.id}`} key={product.id} className={styles.produk__content__item}>
  <div className={styles.produk__content__item__image}>
    <img 
      src={product.image} 
      alt={product.name} 
      style={{ pointerEvents: 'none' }} // Mencegah gambar memblokir klik pada Link
    />
  </div>
  <h4 className={styles.produk__content__item__name}>{product.name}</h4>
  <p className={styles.produk__content__item__category}>{product.category}</p>
  <p className={styles.produk__content__item__price}>
    Rp {product.price.toLocaleString('id-ID')}
  </p>
</Link>
          ))
        )}
      </div>
    </div>
  );
};

export default TampilanProduk;