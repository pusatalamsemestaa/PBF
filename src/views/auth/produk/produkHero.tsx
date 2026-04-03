import styles from "./produk.module.scss";

const ProdukHero = () => {
  return (
    <section className={styles.hero}>
      <div className="bg-blue-100 p-10 rounded-lg text-center mb-8">
        <h1 className="text-4xl font-bold text-blue-800">
          Koleksi Produk Terbaru
        </h1>
        <p className="text-gray-600 mt-2">
          Temukan barang impian Anda dengan harga terbaik.
        </p>
      </div>
    </section>
  );
};

export default ProdukHero;
