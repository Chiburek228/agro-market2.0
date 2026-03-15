import { type FormEvent, useEffect, useMemo, useRef, useState } from "react";

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

const UNSPLASH = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=800`;

const INITIAL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Картофель ранний в мешках",
    price: 18,
    unit: "₽/кг",
    category: "Овощи",
    region: "Белгородская область",
    image: UNSPLASH("1587731255977-1ff29f05fa3d"),
    badge: "Эко",
  },
  {
    id: 2,
    name: "Пшеница продовольственная",
    price: 14500,
    unit: "₽/т",
    category: "Зерно",
    region: "Краснодарский край",
    image: UNSPLASH("1500937386664-56d1dfef3854"),
    badge: "Опт",
  },
  {
    id: 3,
    name: "Кукуруза на зерно",
    price: 13200,
    unit: "₽/т",
    category: "Зерно",
    region: "Ростовская область",
    image: UNSPLASH("1560806887-1e4cd0b6cbd6"),
    badge: "Опт",
  },
  {
    id: 4,
    name: "Яблоки сладкие",
    price: 95,
    unit: "₽/кг",
    category: "Фрукты",
    region: "Липецкая область",
    image: UNSPLASH("1570913149827-d2ac84ab3f9a"),
    badge: "Эко",
  },
  {
    id: 5,
    name: "Молоко фермерское",
    price: 70,
    unit: "₽/л",
    category: "Молочная продукция",
    region: "Тверская область",
    image: UNSPLASH("1582719478250-c89cae4dc85b"),
    badge: "Эко",
  },
  {
    id: 6,
    name: "Комбайн John Deere",
    price: 2150000,
    unit: "₽/шт",
    category: "Техника",
    region: "Воронежская область",
    image: UNSPLASH("1535361802424-621f6466bb00"),
    badge: "Опт",
  },
  {
    id: 7,
    name: "Минеральные удобрения NPK",
    price: 26500,
    unit: "₽/т",
    category: "Удобрения",
    region: "Самарская область",
    image: UNSPLASH("1590412506268-ef4fb9a0c38b"),
    badge: "Опт",
  },
  {
    id: 8,
    name: "Томаты на ветке",
    price: 120,
    unit: "₽/кг",
    category: "Овощи",
    region: "Московская область",
    image: UNSPLASH("1546476520-0a88d6587561"),
    badge: "Эко",
  },
  {
    id: 9,
    name: "Подсолнечник масличный",
    price: 15500,
    unit: "₽/т",
    category: "Зерно",
    region: "Саратовская область",
    image: UNSPLASH("1501004318641-b39e6451bec6"),
    badge: "Опт",
  },
  {
    id: 10,
    name: "Сыр полутвёрдый",
    price: 620,
    unit: "₽/кг",
    category: "Молочная продукция",
    region: "Алтайский край",
    image: UNSPLASH("1544025162-d76694265947"),
    badge: "Эко",
  },
  {
    id: 11,
    name: "Органические удобрения",
    price: 9800,
    unit: "₽/т",
    category: "Удобрения",
    region: "Беларусь",
    image: UNSPLASH("1618477388954-7852f32655ec"),
    badge: "Эко",
  },
  {
    id: 12,
    name: "Трактор МТЗ",
    price: 3890000,
    unit: "₽/шт",
    category: "Техника",
    region: "Челябинская область",
    image: UNSPLASH("1604068549290-dea0e4a305ca"),
    badge: "Опт",
  },
  {
    id: 13,
    name: "Груши садовые",
    price: 110,
    unit: "₽/кг",
    category: "Фрукты",
    region: "Краснодарский край",
    image: UNSPLASH("1592841200221-a6898f28266e"),
    badge: "Эко",
  },
  {
    id: 14,
    name: "Морковь столовая",
    price: 32,
    unit: "₽/кг",
    category: "Овощи",
    region: "Нижегородская область",
    image: UNSPLASH("1587731527661-9b9e4c4f3c28"),
    badge: "Эко",
  },
  {
    id: 15,
    name: "Кормовая пшеница",
    price: 11700,
    unit: "₽/т",
    category: "Зерно",
    region: "Ставропольский край",
    image: UNSPLASH("1598981457915-aea220950616"),
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
      return UNSPLASH("1587731255977-1ff29f05fa3d");
    case "Фрукты":
      return UNSPLASH("1570913149827-d2ac84ab3f9a");
    case "Зерно":
      return UNSPLASH("1598981457915-aea220950616");
    case "Молочная продукция":
      return UNSPLASH("1582719478250-c89cae4dc85b");
    case "Удобрения":
      return UNSPLASH("1590412506268-ef4fb9a0c38b");
    case "Техника":
      return UNSPLASH("1604068549290-dea0e4a305ca");
    default:
      return UNSPLASH("1501004318641-b39e6451bec6");
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
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "expensive") {
      list = [...list].sort((a, b) => b.price - a.price);
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

  const productsGridRef = useRef<HTMLDivElement>(null);

  const scrollToProducts = () => {
    productsGridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <main className="min-h-screen bg-[#0a0a0c] text-white pt-16 pb-10 font-sans" style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-10">
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between transition-all duration-500 ease-in-out">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-black tracking-[0.2em] text-teal-300">
              AGRO
            </span>
            <span className="text-xs text-gray-400 hidden sm:inline">
              Маркетплейс свежей сельхозпродукции
            </span>
          </div>

          <div className="flex flex-col gap-3 md:flex-row md:items-center">
            <div className="flex-1 min-w-[220px] space-y-2">
              <input
                type="text"
                placeholder="Поиск по названию или региону..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="w-full rounded-full bg-[#121218] border border-teal-700/40 px-4 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-400 ease-in-out"
              />
              {(searchQuery.trim() !== "" || activeCategory !== "Все") && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("Все");
                  }}
                  className="text-xs text-teal-400 hover:text-teal-300 transition-colors duration-400 ease-in-out"
                >
                  Очистить все
                </button>
              )}
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setViewMode("market")}
                className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-400 ease-in-out ${
                  viewMode === "market"
                    ? "bg-teal-600 text-white"
                    : "bg-transparent border border-teal-700/60 text-gray-200 hover:border-teal-500/80"
                }`}
              >
                Маркет
              </button>
              <button
                type="button"
                onClick={() => setViewMode("my")}
                className={`px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-400 ease-in-out ${
                  viewMode === "my"
                    ? "bg-teal-600 text-white"
                    : "bg-transparent border border-teal-700/60 text-gray-200 hover:border-teal-500/80"
                }`}
              >
                Мои объявления
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1.5 rounded-full bg-transparent border border-sky-600/70 text-xs font-medium text-white hover:bg-sky-600/20 transition-all duration-400 ease-in-out"
            >
              Стать поставщиком
            </button>
            <div className="text-xs text-gray-400">
              Избранное:{" "}
              <span className="font-semibold text-sky-400">
                {favorites.length}
              </span>
            </div>
          </div>
        </header>

        <section className="py-12 md:py-20 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight max-w-3xl">
            AgroMarket: Вкус, который нельзя подделать
          </h2>
          <p className="mt-6 text-lg text-gray-400 max-w-xl">
            Настоящие продукты от проверенных хозяйств. Без подделок и компромиссов.
          </p>
          <button
            type="button"
            onClick={scrollToProducts}
            className="mt-10 px-8 py-4 rounded-full bg-teal-600 text-white font-bold text-lg hover:bg-teal-500 transition-all duration-500 active:scale-[0.98]"
          >
            Смотреть продукты
          </button>
        </section>

        <section className="grid gap-8 md:grid-cols-[1.05fr,0.95fr] items-start" ref={productsGridRef}>
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                Свежие продукты напрямую от проверенных фермеров
              </h3>
              <p className="text-sm text-gray-300 max-w-xl">
                Собирайте заказы: овощи, фрукты, зерно, молочная продукция, техника и удобрения — с прозрачными ценами.
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-xs uppercase tracking-wide text-gray-400">
                Категории
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setActiveCategory("Все")}
                  className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-400 ease-in-out ${
                    activeCategory === "Все"
                      ? "border-teal-500 bg-teal-600 text-white"
                      : "border-gray-700 bg-[#101018] text-gray-300 hover:border-teal-500/80 hover:text-white"
                  }`}
                >
                  <span>Все</span>
                </button>
                {CATEGORY_OPTIONS.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-all duration-400 ease-in-out ${
                      activeCategory === category.id
                        ? "border-teal-500 bg-teal-600 text-white"
                        : "border-gray-700 bg-[#101018] text-gray-300 hover:border-teal-500/80 hover:text-white"
                    }`}
                  >
                    <span className="text-[0.65rem] leading-none">{category.icon}</span>
                    <span>{category.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs text-gray-400">
              <div>
                <span className="font-semibold text-teal-400">500+</span>{" "}
                фермерских хозяйств
              </div>
              <div>
                <span className="font-semibold text-sky-400">24 часа</span>{" "}
                среднее время доставки
              </div>
              <div>
                <span className="font-semibold text-teal-400">4.9★</span>{" "}
                средний рейтинг покупателей
              </div>
            </div>
          </div>

          {/* Список товаров */}
          <div className="rounded-2xl bg-[#111119] border border-teal-700/30 shadow-lg p-4 space-y-4 transition-all duration-400 ease-in-out">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-white">
                {viewMode === "market" ? "Товары" : "Мои объявления"} (
                {filteredProducts.length})
              </h3>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-900/40 text-teal-300">
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
                className="rounded-full bg-[#15151f] border border-gray-700 px-3 py-1 text-xs text-gray-200 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-all duration-400 ease-in-out"
              >
                <option value="none">Без сортировки</option>
                <option value="cheap">Сначала дешёвые</option>
                <option value="expensive">Сначала дорогие</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 transition-opacity duration-500 ease-in-out">
              {isLoading
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="rounded-2xl overflow-hidden bg-[#15151f] border border-gray-800 animate-pulse"
                    >
                      <div className="w-full aspect-video bg-[#1a1a24]" />
                      <div className="p-3 space-y-2">
                        <div className="h-3 w-2/3 rounded bg-[#1a1a24]" />
                        <div className="h-3 w-1/2 rounded bg-[#1a1a24]" />
                      </div>
                    </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-500 ease-in-out">
          <div className="w-full max-w-md rounded-2xl bg-[#0a0a0c] text-white shadow-2xl border border-teal-700/50 p-5 animate-fade-in">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h2 className="text-lg font-semibold">Стать поставщиком</h2>
                <p className="text-xs text-gray-400 mt-1">
                  Заполните краткую форму, чтобы добавить свой товар в ленту.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white text-lg leading-none transition-colors duration-400"
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
                  className="w-full rounded-xl bg-[#14141c] border border-gray-700 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
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
                    className="w-full rounded-xl bg-[#14141c] border border-gray-700 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
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
                    className="w-full rounded-xl bg-[#14141c] border border-gray-700 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-300"
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
                  className="px-3 py-1.5 rounded-full bg-teal-600 text-xs font-semibold text-white hover:bg-teal-500 transition-all duration-400 ease-in-out"
                >
                  Добавить товар
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-500 ease-in-out">
          <div className="w-full max-w-2xl rounded-2xl bg-[#0a0a0c] text-white shadow-2xl border border-teal-700/50 p-5 animate-fade-in">
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
                className="text-gray-400 hover:text-white text-lg leading-none transition-colors duration-400"
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
                  <div className="text-lg font-semibold text-teal-300">
                    {selectedProduct.price.toLocaleString("ru-RU")}{" "}
                    {selectedProduct.unit}
                  </div>
                  <button className="mt-3 w-full px-3 py-2 rounded-full bg-teal-600 text-sm font-semibold text-white hover:bg-teal-500 transition-all duration-400 ease-in-out">
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
                          className="flex items-center gap-2 rounded-xl bg-[#15151f] border border-gray-800 px-2 py-1.5 text-left hover:border-teal-500/60 transition-all duration-400 ease-in-out"
                        >
                          <div className="h-8 w-8 overflow-hidden rounded-lg flex-shrink-0">
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
                            <div className="text-[11px] text-teal-300">
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
              className="rounded-xl bg-[#15151f] border border-teal-700/50 px-3 py-1.5 text-xs text-gray-100 shadow-lg animate-fade-in"
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
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group flex flex-col text-left rounded-xl overflow-hidden bg-[#15151f] border border-gray-800 hover:border-teal-500/60 shadow-sm hover:shadow-teal-900/20 transition-all duration-500 ease-in-out animate-fade-in">
      <button
        type="button"
        onClick={onClick}
        className="flex-1 flex flex-col text-left"
      >
        <div className="relative w-full aspect-video overflow-hidden rounded-t-xl">
          {!imageLoaded && (
            <div
              className="absolute inset-0 rounded-t-xl bg-[#1a1a24] animate-pulse"
              aria-hidden
            />
          )}
          <img
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-[1.03] ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent pointer-events-none"
            aria-hidden
          />
          <div className="absolute bottom-1.5 left-1.5 right-1.5">
            <span className="text-xs font-medium text-white line-clamp-2 drop-shadow-md">
              {product.name}
            </span>
          </div>
        </div>
        <div className="p-2.5 flex flex-col gap-1">
          <div className="flex items-center justify-between gap-1.5">
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-teal-900/50 text-teal-300">
              {product.badge}
            </span>
            <span className="text-[11px] text-gray-400">{product.region}</span>
          </div>
          <div className="text-xs font-semibold text-teal-300">
            {product.price.toLocaleString("ru-RU")} {product.unit}
          </div>
        </div>
      </button>
      <div className="flex items-center justify-between px-2.5 pb-1.5 pt-0.5 text-[10px] text-gray-400">
        <button
          type="button"
          onClick={onToggleFavorite}
          className={`flex items-center gap-0.5 transition-colors duration-400 ease-in-out ${
            isFavorite ? "text-sky-400" : "text-gray-500"
          } hover:text-sky-300`}
        >
          <span aria-hidden="true" className="text-sm leading-none">{isFavorite ? "❤️" : "🤍"}</span>
        </button>
        {showDelete && onDelete && (
          <button
            type="button"
            onClick={onDelete}
            className="text-[10px] text-red-400 hover:text-red-300 transition-colors duration-400"
          >
            Удалить
          </button>
        )}
      </div>
    </div>
  );
}
