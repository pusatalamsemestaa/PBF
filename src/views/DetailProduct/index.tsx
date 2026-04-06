import { ProductType } from "../../types/Product.type";
import styles from "./detailProduct.module.scss";

const DetailProduk = ({ products }: { products: ProductType }) => {
  // Safety check agar tidak crash saat loading
  if (!products || !products.name) return null;

  return (
  <>
    <h1 className={styles.title}>Detail Produk</h1>
    <div className={styles.productDetail}>
      <div className={styles._image}>
        <img src={products.image} alt={products.name} />
      </div>

      <div className={styles._info}>
        <h1 className={styles._name}>{products.name}</h1>
        <p className={styles._category}>{products.category}</p>
        <p className={styles._price}>
          Rp {products.price?.toLocaleString("id-ID") || "0"}
        </p>
      </div>
    </div>
  </>
  );
};

export default DetailProduk;