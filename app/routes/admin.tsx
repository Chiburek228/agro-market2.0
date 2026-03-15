import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Header } from "../components/Header";
import { products } from "../data/products";

export default function AdminPage() {
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(false);
  const [productList, setProductList] = useState(products);

  useEffect(() => {
    const password = prompt("Введите пароль для доступа к админ-панели:");
    if (password === "chef2026") {
      setAuthenticated(true);
    } else {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    const saved = localStorage.getItem("admin-products");
    if (saved) {
      setProductList(JSON.parse(saved));
    }
  }, []);

  const toggleAvailability = (id: string) => {
    setProductList(prev => {
      const updated = prev.map(product =>
        product.id === id ? { ...product, isAvailable: !product.isAvailable } : product
      );
      localStorage.setItem("admin-products", JSON.stringify(updated));
      return updated;
    });
  };

  const updateStock = (id: string, newStock: number) => {
    setProductList(prev => {
      const updated = prev.map(product =>
        product.id === id ? { ...product, stock: newStock } : product
      );
      localStorage.setItem("admin-products", JSON.stringify(updated));
      return updated;
    });
  };

  if (!authenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#f9f7f2]">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 mb-8 sm:mb-12 transition-all duration-500">
          Админ-панель
        </h1>
        <div className="space-y-4">
          {productList.map((product) => (
            <div
              key={product.id}
              className="bg-white p-6 rounded-2xl border border-stone-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded-xl" />
                <div>
                  <h3 className="text-xl font-bold text-stone-900">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <label className="text-stone-500">Stock:</label>
                    <input
                      type="number"
                      value={product.stock}
                      onChange={(e) => updateStock(product.id, parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 border border-stone-300 rounded"
                    />
                  </div>
                </div>
              </div>
              <button
                onClick={() => toggleAvailability(product.id)}
                className={`px-4 py-2 rounded-xl font-bold transition-all ${
                  product.isAvailable
                    ? "bg-rose-600 text-white hover:bg-rose-700"
                    : "bg-emerald-600 text-white hover:bg-emerald-700"
                }`}
              >
                {product.isAvailable ? "В стоп-лист" : "Вернуть"}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link
            to="/"
            className="px-6 py-3 bg-stone-600 text-white font-bold rounded-xl hover:bg-stone-700 transition-all"
          >
            Вернуться на главную
          </Link>
        </div>
      </main>
    </div>
  );
}