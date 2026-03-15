import { useState } from "react";
import { Header } from "../components/Header";

export default function ContactsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Спасибо за сообщение! Мы свяжемся с вами скоро.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-[#1A1A1A] mb-8 sm:mb-12 transition-all duration-500">
          Контакты
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
            <h2 className="text-2xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-stone-600 mb-4">Телефон: <a href="tel:+7-999-123-45-67" className="text-[#2D4F1E] hover:underline">+7 (999) 123-45-67</a></p>
            <p className="text-stone-600 mb-4">WhatsApp: <a href="https://wa.me/79991234567" className="text-[#2D4F1E] hover:underline">Написать</a></p>
            <p className="text-stone-600">Telegram: <a href="https://t.me/agroshop" className="text-[#2D4F1E] hover:underline">@agroshop</a></p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200">
            <h2 className="text-2xl font-bold mb-4">Форма обратной связи</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-stone-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full p-3 border border-stone-300 rounded-lg"
              />
              <textarea
                placeholder="Сообщение"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full p-3 border border-stone-300 rounded-lg h-32"
              ></textarea>
              <button type="submit" className="w-full bg-[#BC5434] text-white py-3 rounded-lg font-bold hover:bg-[#A43D2A]">Отправить</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}