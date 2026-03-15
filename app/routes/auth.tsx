import { Link } from "react-router";
import { Header } from "../components/Header";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-12 rounded-[3rem] shadow-2xl border border-stone-100 max-w-md w-full">
          <h1 className="text-4xl font-black text-stone-900 mb-8 text-center tracking-tight">Вход</h1>
          <form className="space-y-6" onSubmit={(e) => {
            e.preventDefault();
            alert("Вход выполнен");
          }}>
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-400 uppercase tracking-widest ml-2">Email</label>
              <input 
                type="email" 
                required 
                placeholder="agro@market.ru"
                className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:border-emerald-500 outline-none font-bold transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-stone-400 uppercase tracking-widest ml-2">Пароль</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                className="w-full px-6 py-4 rounded-2xl bg-stone-50 border border-stone-100 focus:border-emerald-500 outline-none font-bold transition-all"
              />
            </div>
            <button 
              type="submit" 
              className="w-full py-5 rounded-2xl bg-emerald-600 text-white font-black text-xl hover:bg-emerald-700 shadow-xl shadow-emerald-100 transition-all active:scale-[0.98]"
            >
              ВОЙТИ
            </button>
          </form>
          <div className="mt-8 text-center">
            <span className="text-stone-400 font-medium">Нет аккаунта? </span>
            <button className="text-emerald-600 font-black hover:underline underline-offset-4">
              Создать профиль
            </button>
          </div>
          <Link to="/" className="mt-8 block text-center text-stone-300 font-bold text-sm hover:text-emerald-600 transition-colors">
            Вернуться на главную
          </Link>
        </div>
      </main>
    </div>
  );
}
