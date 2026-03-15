import React from "react";

export function ContactForm() {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-2xl mx-auto my-16">
      <h2 className="text-3xl font-black text-gray-900 mb-6 text-center">Связаться с нами</h2>
      <form className="space-y-6" onSubmit={(e) => {
        e.preventDefault();
        alert("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
      }}>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Имя</label>
          <input 
            type="text" 
            required 
            placeholder="Иван Иванов"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Телефон</label>
          <input 
            type="tel" 
            required 
            placeholder="+7 (999) 000-00-00"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Сообщение</label>
          <textarea 
            required 
            rows={4}
            placeholder="Ваш вопрос или пожелание..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none resize-none"
          ></textarea>
        </div>
        <button 
          type="submit" 
          className="w-full py-4 rounded-xl bg-emerald-600 text-white font-black text-lg hover:bg-emerald-700 hover:shadow-xl hover:shadow-emerald-100 transition-all active:scale-[0.98]"
        >
          Отправить сообщение
        </button>
      </form>
    </div>
  );
}
