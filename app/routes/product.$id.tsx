import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { products } from "../data/products";
import { Header } from "../components/Header";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#f9f7f2] flex flex-col items-center justify-center p-4">
        <Header />
        <h1 className="text-2xl font-bold text-stone-900 mb-4">Товар не найден</h1>
        <Link to="/" className="text-emerald-600 hover:text-emerald-700 font-bold transition-all duration-500">
          Вернуться на главную
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-stone-400 hover:text-emerald-600 font-bold transition-all duration-500 group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform duration-500">
            <path d="m15 18-6-6 6-6" />
          </svg>
          Назад
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-6">
            <div className="aspect-square rounded-[2.5rem] overflow-hidden bg-white shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 transition-all duration-500">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
            </div>
          </div>

          <div className="flex flex-col py-4">
            <h1 className="text-4xl lg:text-6xl font-black text-stone-900 mb-6 leading-tight tracking-tight">
              {product.name}
            </h1>

            <div className="text-4xl font-black text-emerald-600 mb-8 transition-all duration-500">
              {product.price.toLocaleString("ru-RU")} ₽
            </div>

            <p className="text-lg text-stone-500 mb-12 leading-relaxed font-medium">
              {product.description}
            </p>

            <div className="space-y-8 mb-12">
              <h3 className="text-xl font-black text-stone-900 uppercase tracking-widest border-b border-stone-100 pb-4">
                Характеристики
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex flex-col transition-all duration-500">
                    <span className="text-xs text-stone-400 font-black uppercase tracking-widest mb-1">
                      {key}
                    </span>
                    <span className="text-stone-900 font-bold text-lg">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => addItem(product)}
              className="mt-auto w-full py-6 rounded-2xl bg-[#d2691e] text-white font-black text-xl hover:bg-[#b8571f] shadow-[0_20px_50px_rgba(0,0,0,0.08)] shadow-orange-100/50 transition-all duration-500 active:scale-[0.98] flex items-center justify-center gap-4"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="28" 
                height="28" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
              ДОБАВИТЬ В КОРЗИНУ
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
