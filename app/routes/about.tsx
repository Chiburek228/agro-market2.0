import { Header } from "../components/Header";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 mb-8 sm:mb-12 transition-all duration-500">
          О нашей ферме
        </h1>
        <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <p className="text-lg text-stone-600 leading-relaxed mb-6">
            Мы — семейная ферма, расположенная в живописных предгорьях Алтая. Уже более 20 лет мы выращиваем натуральные продукты без использования химикатов и стимуляторов роста.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed mb-6">
            Наша миссия — предоставлять свежие, здоровые продукты прямо с поля на ваш стол. Мы заботимся о земле, животных и нашем сообществе.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed">
            Присоединяйтесь к нам и наслаждайтесь вкусом настоящей природы!
          </p>
        </div>
      </main>
    </div>
  );
}