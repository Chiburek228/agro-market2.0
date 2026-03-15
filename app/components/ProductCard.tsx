import { Link } from "react-router";
import type { Product } from "../data/products";
import { useCart } from "../context/CartContext";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-stone-200 flex flex-col h-full group transition-all duration-500 hover:shadow-xl hover:scale-105 relative">
      {product.stock < 5 && product.isAvailable && (
        <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10">
          Заканчивается!
        </div>
      )}
      {!product.isAvailable && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="bg-white p-4 rounded-2xl">
            <p className="text-stone-900 font-bold">Нет в наличии</p>
          </div>
        </div>
      )}
      <Link
        to={`/product/${product.id}`}
        className="block relative overflow-hidden"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      <div className="p-8 flex flex-col flex-1">
        <div className="mb-4">
          <Link to={`/product/${product.id}`} className="block">
            <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-600 transition-colors duration-500 line-clamp-1 mb-1">
              {product.name}
            </h3>
          </Link>
          <div className="text-2xl font-black text-emerald-600 transition-colors duration-500">
            {product.price.toLocaleString("ru-RU")} ₽
          </div>
        </div>

        <p className="text-stone-500 text-sm line-clamp-2 mb-8 leading-relaxed">
          {product.description}
        </p>

        <div className="mt-auto flex items-center gap-3">
          <Link
            to={`/product/${product.id}`}
            className="flex-1 py-4 px-4 rounded-2xl bg-stone-50 text-stone-700 font-bold text-center text-sm hover:bg-stone-100 transition-all duration-500 active:scale-[0.98]"
          >
            Подробнее
          </Link>
          <button
            onClick={() => addItem(product)}
            disabled={!product.isAvailable}
            className={`flex-1 py-4 px-4 rounded-2xl font-bold text-sm transition-all duration-500 active:scale-95 shadow-lg flex items-center justify-center gap-2 ${
              product.isAvailable
                ? "bg-[#BC5434] text-white hover:bg-[#A43D2A]"
                : "bg-stone-300 text-stone-500 cursor-not-allowed"
            }`}
            title="Добавить в корзину"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
