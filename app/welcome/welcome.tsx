import { type FormEvent, useEffect, useMemo, useState } from "react";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

type ProductCategory =
  | "Овощи"
  | "Зерно"
  | "Фрукты"
  | "Молочная продукция"
  | "Техника"
  | "Удобрения";

type Product = {
  id: number;
  name: string;
  price: number;
  unit: string;
  category: ProductCategory;
  region: string;
  image: string;
  badge: string;
  owner?: "system" | "me";
};

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Картофель ранний",
    price: 18,
    unit: "₽/кг",
    category: "Овощи",
    region: "Белгородская область",
    image:
      "https://images.unsplash.com/photo-1518977956815-dee006e48be0?auto=format&fit=crop&w=800&q=80",
    badge: "Эко",
  },
  {
    id: 2,
    name: "Пшеница продовольственная",
    price: 14500,
    unit: "₽/т",
    category: "Зерно",
    region: "Краснодарский край",
    image:
      "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80",
    badge: "Опт",
  },
  {
    id: 3,
    name: "Кукуруза на зерно",
    price: 13200,
    unit: "₽/т",
    category: "Зерно",
    region: "Ростовская область",
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    badge: "Опт",
  },
  {
    id: 4,
    name: "Яблоки сладкие",
    price: 95,
    unit: "₽/кг",
    category: "Фрукты",
    region: "Липецкая область",
    image:
      "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?auto=format&fit=crop&w=800&q=80",
    badge: "Эко",
  },
  {
    id: 5,
    name: "Молоко фермерское",
    price: 70,
    unit: "₽/л",
    category: "Молочная продукция",
    region: "Тверская область",
    image:
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80",
    badge: "Эко",
  },
  {
    id: 6,
    name: "Сельский трактор",
    price: 2150000,
    unit: "₽/шт",
    category: "Техника",
    region: "Воронежская область",
    image:
      "https://images.unsplash.com/photo-1535361802424-621f6466bb00?auto=format&fit=crop&w=800&q=80",
    badge: "Опт",
  },
  {
    id: 7,
    name: "Минеральные удобрения NPK",
    price: 26500,
    unit: "₽/т",
    category: "Удобрения",
    region: "Самарская область",
    image:
      "https://images.unsplash.com/photo-1590412506268-ef4fb9a0c38b?auto=format&fit=crop&w=800&q=80",
    badge: "Опт",
  },
  {
    id: 8,
    name: "Огурцы тепличные",
    price: 120,
    unit: "₽/кг",
    category: "Овощи",
    region: "Московская область",
    image:
      "https://images.unsplash.com/photo-1587049352851-8d4e8913393b?auto=format&fit=crop&w=800&q=80",
    badge: "Эко",
  },
  {
    id: 9,
    name: "Подсолнечник масличный",
    price: 15500,
    unit: "₽/т",
    category: "Зерно",
    region: "Саратовская область",
    image:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    badge: "Опт",
  },
  {
    id: 10,
    name: "Сыр полутвёрдый",
    price: 620,
    unit: "₽/кг",
    category: "Молочная продукция",
    region: "Алтайский край",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80",
    badge: "Эко",
  },
  {
    id: 11,
    name: "Органические удобрения",
    price: 9800,
    unit: "₽/т",
    category: "Удобрения",
    region: "Беларусь",
    image:
      "https://images.unsplash.com/photo-1618477388954-7852f32655ec?auto=format&fit=crop&w=800&q=80",
    badge: "Эко",
  },
  {
    id: 12,
    name: "Фронтальный погрузчик",
    price: 3890000,
    unit: "₽/шт",
    category: "Техника",
    region: "Челябинская область",
    image:
      "https://images.unsplash.com/photo-1589924387558-4c1fea13312f?auto=format&fit=crop&w=800&q=80",
    badge: "Опт",
  },
  {
    id: 13,
    name: "Груши садовые",
    price: 110,
    unit: "₽/кг",
    category: "Фрукты",
    region: "Краснодарский край",
    image:
      "https://images.unsplash.com/photo-1592841200221-a6898f28266e?auto=format&fit=crop&w=800&q=80",
    badge: "Эко",
  },
  {
    id: 14,
    name: "Морковь столовая",
    price: 32,
    unit: "₽/кг",
    category: "Овощи",
    region: "Нижегородская область",
    image:
      "https://images.unsplash.com/photo-1587731527661-9b9e4c4f3c28?auto=format&fit=crop&w=800&q=80",
    badge: "Эко",
  },
  {
    id: 15,
    name: "Кормовая пшеница",
    price: 11700,
    unit: "₽/т",
    category: "Зерно",
    region: "Ставропольский край",
    image:
      "https://images.unsplash.com/photo-1500043201629-50c77c5a57aa?auto=format&fit=crop&w=800&q=80",
    badge: "Опт",
  },
];

const CATEGORY_OPTIONS: { id: ProductCategory; label: string; icon: string }[] =
  [
    { id: "Овощи", label: "Овощи", icon: "🥕" },
    { id: "Фрукты", label: "Фрукты", icon: "🍎" },
    { id: "Зерно", label: "Зерно", icon: "🌾" },
    { id: "Молочная продукция", label: "Молочка", icon: "🥛" },
    { id: "Удобрения", label: "Удобрения", icon: "🧪" },
    { id: "Техника", label: "Техника", icon: "🚜" },
  ];

function inferUnitByCategory(category: ProductCategory): string {
  switch (category) {
    case "Овощи":
    case "Фрукты":
      return "₽/кг";
    case "Зерно":
    case "Удобрения":
      return "₽/т";
    case "Молочная продукция":
      return "₽/л";
    case "Техника":
      return "₽/шт";
    default:
      return "₽/шт";
  }
}

function inferImageByCategory(category: ProductCategory): string {
  switch (category) {
    case "Овощи":
      return "https://images.unsplash.com/photo-1587731255977-1ff29f05fa3d?auto=format&fit=crop&w=800&q=80";
    case "Фрукты":
      return "https://images.unsplash.com/photo-1547514701-9cdcb1f59402?auto=format&fit=crop&w=800&q=80";
    case "Зерно":
      return "https://images.unsplash.com/photo-1598981457915-aea220950616?auto=format&fit=crop&w=800&q=80";
    case "Молочная продукция":
      return "https://images.unsplash.com/photo-1580915411954-282cb1c9c450?auto=format&fit=crop&w=800&q=80";
    case "Удобрения":
      return "https://images.unsplash.com/photo-1518133835878-5d7f39e94933?auto=format&fit=crop&w=800&q=80";
    case "Техника":
      return "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800&q=80";
    default:
      return "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80";
  }
}

export function Welcome() {
  const [products, setProducts] = useState<Product[]>(() => {
    if (typeof window === "undefined") return INITIAL_PRODUCTS;
    try {
      const stored = window.localStorage.getItem("agro-market-products");
      if (stored) {
        const parsed = JSON.parse(stored) as Product[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return INITIAL_PRODUCTS.map((product) => ({
      ...product,
      owner: "system" as const,
    }));
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<ProductCategory | "Все">(
    "Все",
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newCategory, setNewCategory] = useState<ProductCategory>("Овощи");
  const [newPrice, setNewPrice] = useState("");
  const [favorites, setFavorites] = useState<number[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = window.localStorage.getItem("agro-market-favorites");
      if (stored) {
        const parsed = JSON.parse(stored) as number[];
        if (Array.isArray(parsed)) return parsed;
      }
    } catch {
      // ignore
    }
    return [];
  });
  const [viewMode, setViewMode] = useState<"market" | "my">("market");
  const [sortOrder, setSortOrder] = useState<"none" | "cheap" | "expensive">(
    "none",
  );
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [toasts, setToasts] = useState<
    { id: number; message: string }[]
  >([]);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("agro-market-filters");
      if (stored) {
        const parsed = JSON.parse(stored) as {
          searchQuery?: string;
          activeCategory?: ProductCategory | "Все";
        };
        if (parsed.searchQuery) setSearchQuery(parsed.searchQuery);
        if (parsed.activeCategory) setActiveCategory(parsed.activeCategory);
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "agro-market-filters",
        JSON.stringify({ searchQuery, activeCategory }),
      );
    } catch {
      // ignore
    }
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "agro-market-products",
        JSON.stringify(products),
      );
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      window.localStorage.setItem(
        "agro-market-favorites",
        JSON.stringify(favorites),
      );
    } catch {
      // ignore
    }
  }, [favorites]);

  useEffect(() => {
    setIsLoading(true);
    const timeout = window.setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => window.clearTimeout(timeout);
  }, [activeCategory]);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (activeCategory !== "Все") {
      list = list.filter((p) => p.category === activeCategory);
    }

    if (viewMode === "my") {
      list = list.filter((p) => p.owner === "me");
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.region.toLowerCase().includes(query),
      );
    }

    if (sortOrder === "cheap") {
      list = list.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "expensive") {
      list = list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, searchQuery, activeCategory, viewMode, sortOrder]);

  const handleCardClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleAddProductSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const priceNumber = Number(newPrice.replace(",", "."));
    if (!newName.trim() || Number.isNaN(priceNumber) || priceNumber <= 0) {
      return;
    }

    const id = Date.now();

    const newProduct: Product = {
      id,
      name: newName.trim(),
      price: priceNumber,
      unit: inferUnitByCategory(newCategory),
      category: newCategory,
      region: "Новый поставщик",
      image: inferImageByCategory(newCategory),
      badge: "Эко",
      owner: "me",
    };

    setProducts((prev) => [newProduct, ...prev]);
    setIsModalOpen(false);
    setNewName("");
    setNewPrice("");
    setNewCategory("Овощи");
    addToast("Товар добавлен успешно");
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const set = new Set(prev);
      const exists = set.has(id);
      if (exists) {
        set.delete(id);
        addToast("Товар удалён из избранного");
      } else {
        set.add(id);
        addToast("Товар добавлен в избранное");
      }
      return Array.from(set);
    });
  };

  const handleDeleteProduct = (id: number) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    setFavorites((prev) => prev.filter((favId) => favId !== id));
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
    addToast("Объявление удалено");
  };

  const addToast = (message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white pt-16 pb-10">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-10">
        {/* Шапка */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-white shadow">
              <img
                src={logoLight}
                alt="AgroMarket"
                className="block w-full h-full object-contain dark:hidden"
              />
              <img
                src={logoDark}
                alt="AgroMarket"
                className="hidden w-full h-full object-contain dark:block"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-emerald-300">
                AgroMarket
              </h1>
              <p className="text-sm text-gray-400">
                Маркетплейс свежей сельхозпродукции
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex-1 min-w-[220px]">
              <input
                type="text"
                placeholder="Поиск по названию или региону..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-full bg-[#121218] border border-emerald-700/40 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setViewMode("market")}
                className={`px-3 py-2 rounded-full text-xs font-medium ${
                  viewMode === "market"
                    ? "bg-emerald-600 text-white"
                    : "bg-transparent border border-emerald-700 text-gray-200"
                }`}
              >
                Маркет
              </button>
              <button
                type="button"
                onClick={() => setViewMode("my")}
                className={`px-3 py-2 rounded-full text-xs font-medium ${
                  viewMode === "my"
                    ? "bg-emerald-600 text-white"
                    : "bg-transparent border border-emerald-700 text-gray-200"
                }`}
              >
                Мои объявления
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-full bg-transparent border border-emerald-600 text-sm font-medium text-white hover:bg-emerald-600/20"
            >
              Стать поставщиком
            </button>
            <div className="text-xs text-gray-400">
              Избранное:{" "}
              <span className="font-semibold text-emerald-400">
                {favorites.length}
              </span>
            </div>
          </div>
        </header>

        {/* Герой + фильтры */}
        <section className="grid gap-8 md:grid-cols-[1.05fr,0.95fr] items-start">
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Свежие продукты
                <br />
                напрямую от проверенных фермеров
              </h2>
              <p className="text-sm md:text-base text-gray-300 max-w-xl">
                Собирайте заказы у проверенных поставщиков: овощи, фрукты, зерно,
                молочная продукция, техника и удобрения — с прозрачными ценами и
                быстрой логистикой.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Категории
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveCategory("Все")}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                    activeCategory === "Все"
                      ? "border-emerald-500 bg-emerald-600 text-white"
                      : "border-gray-700 bg-[#101018] text-gray-300 hover:border-emerald-500 hover:text-white"
                  }`}
                >
                  <span>Все</span>
                </button>
                {CATEGORY_OPTIONS.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeCategory === category.id
                        ? "border-emerald-500 bg-emerald-600 text-white"
                        : "border-gray-700 bg-[#101018] text-gray-300 hover:border-emerald-500 hover:text-white"
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-6 text-xs text-gray-400">
              <div>
                <span className="font-semibold text-emerald-400">500+</span>{" "}
                фермерских хозяйств
              </div>
              <div>
                <span className="font-semibold text-emerald-400">24 часа</span>{" "}
                среднее время доставки
              </div>
              <div>
                <span className="font-semibold text-emerald-400">4.9★</span>{" "}
                средний рейтинг покупателей
              </div>
            </div>
          </div>

          {/* Список товаров */}
          <div className="rounded-3xl bg-[#111119] border border-emerald-700/40 shadow-xl p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-white">
                {viewMode === "market" ? "Товары" : "Мои объявления"} (
                {filteredProducts.length})
              </h3>
              <span className="text-[11px] px-2 py-1 rounded-full bg-emerald-900/40 text-emerald-300">
                Прототип маркетплейса
              </span>
            </div>

            <div className="flex items-center justify-between gap-3 text-xs">
              <span className="text-gray-400">
                {sortOrder === "none"
                  ? "Без сортировки"
                  : sortOrder === "cheap"
                  ? "Сначала дешёвые"
                  : "Сначала дорогие"}
              </span>
              <select
                value={sortOrder}
                onChange={(event) =>
                  setSortOrder(event.target.value as
                    | "none"
                    | "cheap"
                    | "expensive")
                }
                className="rounded-full bg-[#15151f] border border-gray-700 px-3 py-1 text-xs text-gray-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="none">Без сортировки</option>
                <option value="cheap">Сначала дешёвые</option>
                <option value="expensive">Сначала дорогие</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-32 rounded-2xl bg-[#15151f] border border-gray-800 animate-pulse"
                    />
                  ))
                : filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => handleCardClick(product)}
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={() => toggleFavorite(product.id)}
                      showDelete={viewMode === "my" && product.owner === "me"}
                      onDelete={() => handleDeleteProduct(product.id)}
                    />
                  ))}
              {!isLoading && filteredProducts.length === 0 && (
                <div className="col-span-full rounded-2xl border border-dashed border-gray-700 p-4 text-center text-xs text-gray-400">
                  По текущим фильтрам ничего не найдено. Попробуйте изменить
                  запрос или категорию.
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-[#0a0a0c] text-white shadow-2xl border border-emerald-700/60 p-6 animate-fade-in">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-semibold">Стать поставщиком</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Заполните краткую форму, чтобы добавить свой товар в ленту.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-xl leading-none"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleAddProductSubmit}>
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-300">
                  Название товара
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                  placeholder="Например, Картофель столовый, 25 кг"
                  className="w-full rounded-2xl bg-[#14141c] border border-gray-700 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300">
                    Категория
                  </label>
                  <select
                    value={newCategory}
                    onChange={(event) =>
                      setNewCategory(event.target.value as ProductCategory)
                    }
                    className="w-full rounded-2xl bg-[#14141c] border border-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    {CATEGORY_OPTIONS.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-gray-300">
                    Цена
                  </label>
                  <input
                    type="number"
                    min={0}
                    step="0.01"
                    value={newPrice}
                    onChange={(event) => setNewPrice(event.target.value)}
                    placeholder="Например, 25 000"
                    className="w-full rounded-2xl bg-[#14141c] border border-gray-700 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <p className="text-[11px] text-gray-500 max-w-[220px]">
                  Новый товар появится в начале списка. Далее — модерация и
                  согласование условий поставки.
                </p>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-full bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-500"
                >
                  Добавить товар
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-[#0a0a0c] text-white shadow-2xl border border-emerald-700/60 p-6 animate-fade-in">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-semibold">{selectedProduct.name}</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Категория: {selectedProduct.category} · Регион:{" "}
                  {selectedProduct.region}
                </p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="text-gray-400 hover:text-white text-xl leading-none"
                aria-label="Закрыть"
              >
                ×
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-[1.1fr,0.9fr] items-start">
              <div className="space-y-3">
                <div className="h-56 w-full overflow-hidden rounded-2xl">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-sm text-gray-300">
                  Это демонстрационное описание для товара «
                  {selectedProduct.name}». В реальном маркетплейсе здесь будет
                  подробная информация о происхождении продукта, условиях
                  хранения, минимальной партии, сроках поставки и других
                  важных деталях для закупщика.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-2xl bg-[#15151f] border border-gray-800 p-4 space-y-2">
                  <div className="text-sm text-gray-400">Цена</div>
                  <div className="text-xl font-semibold text-emerald-300">
                    {selectedProduct.price.toLocaleString("ru-RU")}{" "}
                    {selectedProduct.unit}
                  </div>
                  <button className="mt-3 w-full px-4 py-2 rounded-full bg-emerald-600 text-sm font-semibold text-white hover:bg-emerald-500">
                    Связаться с поставщиком
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="text-xs font-semibold text-gray-300">
                    Похожие товары
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {products
                      .filter(
                        (product) =>
                          product.category === selectedProduct.category &&
                          product.id !== selectedProduct.id,
                      )
                      .slice(0, 3)
                      .map((product) => (
                        <button
                          key={product.id}
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          className="flex items-center gap-3 rounded-xl bg-[#15151f] border border-gray-800 px-2 py-2 text-left hover:border-emerald-500/80"
                        >
                          <div className="h-10 w-10 overflow-hidden rounded-lg">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-medium text-white line-clamp-1">
                              {product.name}
                            </div>
                            <div className="text-[11px] text-emerald-300">
                              {product.price.toLocaleString("ru-RU")}{" "}
                              {product.unit}
                            </div>
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {toasts.length > 0 && (
        <div className="fixed bottom-4 right-4 z-50 space-y-2">
          {toasts.map((toast) => (
            <div
              key={toast.id}
              className="rounded-2xl bg-[#15151f] border border-emerald-700/70 px-4 py-2 text-xs text-gray-100 shadow-lg animate-fade-in"
            >
              {toast.message}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

type ProductCardProps = {
  product: Product;
  onClick: () => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  showDelete?: boolean;
  onDelete?: () => void;
};

function ProductCard({
  product,
  onClick,
  isFavorite,
  onToggleFavorite,
  showDelete,
  onDelete,
}: ProductCardProps) {
  return (
    <div className="group flex flex-col text-left rounded-2xl overflow-hidden bg-[#15151f] border border-gray-800 hover:border-emerald-500/80 shadow-sm hover:shadow-emerald-900/40 transition-all animate-fade-in">
      <button
        type="button"
        onClick={onClick}
        className="flex-1 flex flex-col text-left"
      >
        <div className="h-24 w-full overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <div className="p-3 flex flex-col gap-1.5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-900/50 text-emerald-300">
              {product.badge}
            </span>
            <span className="text-xs text-gray-400">{product.region}</span>
          </div>
          <div className="text-sm font-medium text-white line-clamp-2">
            {product.name}
          </div>
          <div className="text-sm font-semibold text-emerald-300">
            {product.price.toLocaleString("ru-RU")} {product.unit}
          </div>
        </div>
      </button>
      <div className="flex items-center justify-between px-3 pb-2 pt-1 text-[11px] text-gray-400">
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`flex items-center gap-1 ${
            isFavorite ? "text-emerald-300" : "text-gray-500"
          } hover:text-emerald-200`}
        >
          <span aria-hidden="true">{isFavorite ? "❤️" : "🤍"}</span>
        </button>
        {showDelete && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="text-[11px] text-red-400 hover:text-red-300"
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}
