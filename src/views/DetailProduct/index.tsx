import styles from "./detailProduct.module.scss";

const DetailProduk = ({ products }: { products: any }) => {
  if (!products) return null;

  return (
    <div className={styles.container}> {/* Background Hitam */}
      <h1 className={styles.title}>Detail Produk</h1>
      
      <div className={styles.productDetail}> {/* Kartu Putih */}
        <div className={styles._image}>
          <img src={products.image} alt={products.name} />
        </div>

        <div className={styles._info}>
          <h1 className={styles._name}>{products.name}</h1>
          <p className={styles._category}>{products.category}</p>
          <p className={styles._price}>
            Rp {products.price?.toLocaleString("id-ID")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailProduk;