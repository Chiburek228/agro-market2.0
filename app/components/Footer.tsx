export function Footer() {
  return (
    <footer className="bg-[#1a2e1a] text-[#f5f5dc] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-bold">AGRO Market</h3>
            <p className="text-sm">Свежие продукты с фермы</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <a href="tel:+71234567890" className="text-[#f5f5dc] hover:text-emerald-300 transition-colors">
              📞 +7 (123) 456-78-90
            </a>
            <a href="https://t.me/agromarket" target="_blank" rel="noopener noreferrer" className="text-[#f5f5dc] hover:text-emerald-300 transition-colors">
              📱 Telegram
            </a>
            <a href="https://wa.me/71234567890" target="_blank" rel="noopener noreferrer" className="text-[#f5f5dc] hover:text-emerald-300 transition-colors">
              💬 WhatsApp
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm">
          <p>&copy; 2026 AGRO Market. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}