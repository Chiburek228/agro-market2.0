import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useCart } from "../context/CartContext";

export function Header() {
  const { totalItems, lastAddedAt } = useCart();
  const [bump, setBump] = useState(false);

  useEffect(() => {
    if (lastAddedAt > 0 && totalItems > 0) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 600);
      return () => clearTimeout(t);
    }
  }, [lastAddedAt, totalItems]);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#1A2E1A] backdrop-blur-md border-b border-stone-100/80 transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 h-14 sm:h-20 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 group transition-all duration-500"
        >
          <span className="text-xl sm:text-2xl font-black tracking-[0.2em] text-white group-hover:text-emerald-600 transition-colors duration-500">
            AGRO
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-8">
          <Link
            to="/about"
            className="text-white hover:text-emerald-600 font-bold transition-colors duration-500"
          >
            О ферме
          </Link>
          <Link
            to="/delivery"
            className="text-white hover:text-emerald-600 font-bold transition-colors duration-500"
          >
            Доставка
          </Link>
          <Link
            to="/contacts"
            className="text-white hover:text-emerald-600 font-bold transition-colors duration-500"
          >
            Контакты
          </Link>
        </nav>

        <Link
          to="/cart"
          className="relative p-2 sm:p-3 rounded-2xl hover:bg-stone-100/20 transition-all duration-500 group"
          aria-label="Корзина"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white group-hover:text-emerald-600 transition-colors duration-500 w-6 h-6"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          {totalItems > 0 && (
            <span
              className={`absolute -top-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-[10px] font-bold text-white ring-2 ring-white transition-transform duration-200 ${bump ? "animate-bounce" : ""}`}
            >
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}
