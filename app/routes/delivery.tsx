import { Header } from "../components/Header";

export default function DeliveryPage() {
  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 mb-8 sm:mb-12 transition-all duration-500">
          Доставка
        </h1>
        <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-[2.5rem] border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          <p className="text-lg text-stone-600 leading-relaxed mb-6">
            Мы предлагаем быструю и надежную доставку свежих продуктов прямо к вашему порогу. Доставка осуществляется в пределах города и пригорода.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed mb-6">
            Заказы обрабатываются в день оформления, а доставка происходит на следующий день. Минимальная сумма заказа — 1000 ₽.
          </p>
          <p className="text-lg text-stone-600 leading-relaxed">
            Для заказов свыше 3000 ₽ доставка бесплатная. Свяжитесь с нами для уточнения деталей!
          </p>
        </div>
      </main>
    </div>
  );
}