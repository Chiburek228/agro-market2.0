import { Link } from "react-router";
import { Header } from "../components/Header";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const [stockMessage, setStockMessage] = useState<string | null>(null);

  const hasOverStock = items.some(item => item.quantity > item.stock);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#f9f7f2] flex flex-col">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="bg-white p-16 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-stone-100 flex flex-col items-center max-w-lg w-full text-center transition-all duration-500">
            <div className="w-24 h-24 bg-stone-50 rounded-full flex items-center justify-center mb-8">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="40" 
                height="40" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="text-stone-300"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </div>
            <h1 className="text-3xl font-black text-stone-900 mb-4">Корзина пуста</h1>
            <p className="text-lg text-stone-500 mb-10 leading-relaxed">
              Вы еще ничего не выбрали. <br /> Начните покупки прямо сейчас!
            </p>
            <Link
              to="/"
              className="w-full py-5 rounded-2xl bg-[#d2691e] text-white font-black text-lg hover:bg-[#b8571f] shadow-lg shadow-orange-100/50 transition-all duration-500 active:scale-[0.98]"
            >
              В каталог
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 mb-8 sm:mb-12 transition-all duration-500">
          Ваш заказ
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-12">
          {stockMessage && (
            <div className="lg:col-span-3 mb-4 p-4 bg-rose-50 border border-rose-200 rounded-2xl">
              <p className="text-rose-700 font-bold">{stockMessage}</p>
            </div>
          )}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-[2.5rem] border border-stone-100 flex flex-col sm:flex-row gap-4 sm:gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_24px_56px_rgba(0,0,0,0.08)] transition-all duration-500"
              >
                <div className="w-full sm:w-32 sm:h-32 aspect-square rounded-xl sm:rounded-2xl overflow-hidden bg-stone-50 flex-shrink-0">
                  <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <Link to={`/product/${item.id}`} className="text-xl font-bold text-stone-900 hover:text-emerald-600 transition-colors">
                        {item.name}
                      </Link>
                      <p className="text-sm text-stone-400 font-bold mt-1">Цена за ед.: {item.price.toLocaleString("ru-RU")} ₽</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-stone-300 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all duration-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap items-end justify-between gap-6">
                    <div className="flex items-center bg-stone-50 rounded-2xl p-1.5 border border-stone-100 shadow-inner">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => {
                          const newQuantity = parseInt(e.target.value) || 1;
                          if (newQuantity > item.stock) {
                            updateQuantity(item.id, item.stock);
                            setStockMessage(`Извините, на складе только ${item.stock} шт.`);
                            setTimeout(() => setStockMessage(null), 3000);
                          } else {
                            updateQuantity(item.id, newQuantity);
                          }
                        }}
                        className="w-16 max-w-16 text-center font-black text-stone-900 bg-transparent border-none outline-none overflow-hidden"
                      />
                    </div>
                    
                    <div className="text-2xl font-black text-stone-900">
                      {(item.price * item.quantity).toLocaleString("ru-RU")} ₽
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <button 
              onClick={clearCart}
              className="text-stone-400 hover:text-rose-600 font-bold text-sm px-4 py-2 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/></svg>
              Очистить корзину
            </button>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 sm:top-28 bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] transition-all duration-500">
              <h3 className="text-2xl font-black text-stone-900 mb-8 tracking-tight">Итого</h3>
              
              <div className="space-y-4 mb-8 pb-8 border-b border-stone-50">
                <div className="flex justify-between text-stone-500 font-bold">
                  <span>Товары ({totalItems})</span>
                  <span>{totalPrice.toLocaleString("ru-RU")} ₽</span>
                </div>
                <div className="flex justify-between text-stone-500 font-bold">
                  <span>Доставка</span>
                  <span className="text-emerald-600 font-black italic uppercase text-xs tracking-widest">Бесплатно</span>
                </div>
              </div>
              
              <div className="flex justify-between items-end mb-10">
                <span className="text-stone-400 font-black uppercase text-xs tracking-widest">К оплате</span>
                <span className="text-4xl font-black text-emerald-600 tracking-tighter">
                  {totalPrice.toLocaleString("ru-RU")} ₽
                </span>
              </div>
              
              {hasOverStock && (
                <div className="mb-4 p-4 bg-rose-50 border border-rose-200 rounded-2xl">
                  <p className="text-rose-700 font-bold">
                    На складе осталось только {items.find(item => item.quantity > item.stock)?.stock} кг для некоторых товаров.
                  </p>
                </div>
              )}
              
              <button
                onClick={() => alert("Заказ оформлен! Менеджер свяжется с вами.")}
                disabled={hasOverStock}
                className={`w-full py-5 sm:py-6 rounded-2xl font-black text-lg sm:text-xl transition-all duration-500 active:scale-[0.98] ${
                  hasOverStock
                    ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                    : "bg-[#d2691e] text-white hover:bg-[#b8571f] shadow-lg shadow-orange-100/50"
                }`}
              >
                Оформить заказ
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
