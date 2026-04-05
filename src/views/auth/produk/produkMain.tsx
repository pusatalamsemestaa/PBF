import Link from "next/link";
import styles from "./produk.module.scss";
// Import ProductType karena itu nama yang Anda gunakan di file .type.ts
import { ProductType } from "@/types/Product.type"; 

// 1. Definisikan Interface untuk Props menggunakan ProductType
interface ProdukMainProps {
  listProduk: ProductType[];
}

const ProdukMain = ({ listProduk }: ProdukMainProps) => {
  return (
    <main className={`${styles.mainContent} w-full`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
        {listProduk.map((item) => (
          <div 
            key={item.id} 
            className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 transform hover:scale-105 flex flex-col"
          >
            {/* Bagian Gambar Produk */}
            <div className="w-full h-48 bg-gray-100 overflow-hidden">
              <img 
                src={item.image} // Disesuaikan dari item.imageUrl ke item.image
                alt={item.name}  // Disesuaikan dari item.nama ke item.name
                className="w-full h-full object-cover rounded-t-lg hover:brightness-110 transition-all duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://via.placeholder.com/400x300?text=No+Image";
                }}
              />
            </div>

            {/* Bagian Detail Produk */}
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold text-gray-800 truncate mb-2 line-clamp-2">
                {item.name} {/* Disesuaikan ke item.name */}
              </h2>
              <p className="text-blue-600 font-bold text-xl mb-4">
                Rp {item.price ? item.price.toLocaleString("id-ID") : "0"} {/* Disesuaikan ke item.price */}
              </p>

              <Link href={`/produk/${item.id}`} className="mt-auto w-full">
                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-lg font-bold hover:from-green-600 hover:to-green-700 active:from-green-700 active:to-green-800 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg uppercase text-sm tracking-wider">
                  ➜ Lihat Detail Produk
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ProdukMain;