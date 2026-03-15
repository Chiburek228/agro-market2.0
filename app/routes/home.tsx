import { useState, useEffect } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import type { ProductCategory } from "../data/products";
import { products } from "../data/products";
import { Header } from "../components/Header";
import { ProductCard } from "../components/ProductCard";

const CATEGORIES: { id: ProductCategory | "Все"; label: string }[] = [
  { id: "Все", label: "Все" },
  { id: "Мясо", label: "Мясо" },
  { id: "Молочка", label: "Молочка" },
  { id: "Овощи", label: "Овощи" },
  { id: "Выпечка", label: "Выпечка" },
  { id: "Напитки", label: "Напитки" },
  { id: "Мёд", label: "Мёд" },
];

function ProductCardSkeleton() {
  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-stone-100 overflow-hidden animate-pulse">
      <div className="w-full h-64 bg-stone-100" />
      <div className="p-8 space-y-4">
        <div className="h-5 w-3/4 rounded bg-stone-100" />
        <div className="h-8 w-1/4 rounded bg-stone-100" />
        <div className="h-4 w-full rounded bg-stone-100" />
        <div className="h-4 w-2/3 rounded bg-stone-100" />
        <div className="flex gap-3 pt-4">
          <div className="h-12 flex-1 rounded-2xl bg-stone-100" />
          <div className="h-12 w-24 rounded-2xl bg-stone-100" />
        </div>
      </div>
    </div>
  );
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "AGRO — Натуральные продукты" },
    { name: "description", content: "Фермерские продукты с доставкой" },
  ];
}

export default function Home() {
  const [category, setCategory] = useState<ProductCategory | "Все">("Все");
  const [productsLoading, setProductsLoading] = useState(true);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [availableProducts, setAvailableProducts] = useState(products);

  useEffect(() => {
    const saved = localStorage.getItem("admin-products");
    if (saved) {
      setAvailableProducts(JSON.parse(saved));
    } else {
      setAvailableProducts(products);
    }
    setProductsLoading(false);
  }, []);

  const filteredProducts =
    category === "Все"
      ? availableProducts
      : availableProducts.filter((p) => p.category === category);

  useEffect(() => {
    const t = setTimeout(() => setProductsLoading(false), 400);
    return () => clearTimeout(t);
  }, []);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormSubmitting(true);
    setTimeout(() => {
      setFormSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/beef.jpg')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl sm:text-7xl font-bold mb-6">Натуральные продукты из Аши</h1>
          <p className="text-xl sm:text-2xl mb-8">Свежие фермерские продукты прямо к вашему столу</p>
          <button
            onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#BC5434] text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-[#A43D2A] transition-colors"
          >
            В каталог
          </button>
        </div>
      </section>

      <div id="products" className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <header className="mb-10 sm:mb-16">
          <h1 className="text-3xl sm:text-5xl font-black text-[#1A1A1A] mb-4 sm:mb-6 tracking-tight transition-all duration-500">
            Наши продукты
          </h1>
          <p className="text-base sm:text-xl text-stone-600 max-w-2xl leading-relaxed">
            Мы доставляем натуральные продукты напрямую от локальных
            производителей. Честный вкус, высокое качество и забота о вашем
            здоровье.
          </p>
        </header>

        <div className="mb-6 sm:mb-8">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-3">
            Категории
          </p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-500 ${
                  category === c.id
                    ? "bg-emerald-600 text-white"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-100"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {productsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-24">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 mb-24">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <section className="bg-white rounded-2xl sm:rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 overflow-hidden transition-all duration-500">
          <div className="p-8 sm:p-12 lg:p-20">
            <h2 className="text-2xl sm:text-3xl font-black text-stone-900 mb-2 tracking-tight">
              Прямая связь с шефом
            </h2>
            <p className="text-stone-500 mb-8 sm:mb-10 max-w-xl text-sm sm:text-base">
              Напишите нам — ответим в течение часа и поможем с заказом или
              индивидуальной сборкой.
            </p>
            <form
              className="space-y-6 sm:space-y-8 max-w-xl"
              onSubmit={handleFormSubmit}
            >
              <div className="border-b border-stone-200 pb-2 transition-all duration-500 focus-within:border-emerald-600">
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                  Имя
                </label>
                <input
                  type="text"
                  required
                  disabled={formSubmitting}
                  placeholder="Как к вам обращаться?"
                  className="w-full bg-transparent text-stone-900 placeholder:text-stone-300 outline-none font-medium text-base sm:text-lg transition-all duration-500 disabled:opacity-60"
                />
              </div>
              <div className="border-b border-stone-200 pb-2 transition-all duration-500 focus-within:border-emerald-600">
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                  Email или телефон
                </label>
                <input
                  type="text"
                  required
                  disabled={formSubmitting}
                  placeholder="Для ответа"
                  className="w-full bg-transparent text-stone-900 placeholder:text-stone-300 outline-none font-medium text-base sm:text-lg transition-all duration-500 disabled:opacity-60"
                />
              </div>
              <div className="border-b border-stone-200 pb-2 transition-all duration-500 focus-within:border-emerald-600">
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                  Сообщение
                </label>
                <input
                  type="text"
                  placeholder="Вопрос или пожелание"
                  disabled={formSubmitting}
                  className="w-full bg-transparent text-stone-900 placeholder:text-stone-300 outline-none font-medium text-base sm:text-lg transition-all duration-500 disabled:opacity-60"
                />
              </div>
              <button
                type="submit"
                disabled={formSubmitting}
                className="mt-4 w-full py-4 sm:py-5 rounded-2xl bg-[#d2691e] text-white font-black text-base sm:text-lg hover:bg-[#b8571f] shadow-lg shadow-orange-100/50 transition-all duration-500 active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {formSubmitting ? "Отправляем…" : "ОТПРАВИТЬ"}
              </button>
            </form>
          </div>
        </section>
      </div>

      <footer className="bg-[#1A2E1A] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">AGRO</h3>
            <p className="text-stone-300">Натуральные продукты из Аши</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Навигация</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-stone-300 hover:text-white">О ферме</Link></li>
              <li><Link to="/delivery" className="text-stone-300 hover:text-white">Доставка</Link></li>
              <li><Link to="/contacts" className="text-stone-300 hover:text-white">Контакты</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-4">Контакты</h4>
            <p className="text-stone-300 mb-2">
              <a href="tel:+7-999-123-45-67" className="hover:text-white">+7 (999) 123-45-67</a>
            </p>
            <div className="flex space-x-4">
              <a href="https://wa.me/79991234567" className="text-stone-300 hover:text-white text-2xl">📱</a>
              <a href="https://t.me/agroshop" className="text-stone-300 hover:text-white text-2xl">✈️</a>
            </div>
          </div>
        </div>
      </footer>

      {showSuccessModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowSuccessModal(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
        >
          <div
            className="bg-white rounded-2xl sm:rounded-[2.5rem] p-8 sm:p-12 max-w-md w-full shadow-2xl border border-stone-100 text-center transition-all duration-300 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 rounded-full bg-emerald-100 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-emerald-600"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
            </div>
            <h2 id="success-title" className="text-xl sm:text-2xl font-black text-stone-900 mb-2">
              Шеф получил ваш заказ!
            </h2>
            <p className="text-stone-500 mb-8">Скоро свяжемся.</p>
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-4 rounded-2xl bg-[#d2691e] text-white font-bold hover:bg-[#b8571f] transition-all duration-500"
            >
              Отлично
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
