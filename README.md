# AgroMarket

**Профессиональная автоматизация фермерского бизнеса.**

MVP маркетплейса натуральных продуктов: каталог, корзина с сохранением в localStorage, фильтрация по категориям, форма связи с шефом и адаптивный интерфейс для заказов с полей.

## Стек

- **React Router 7** — маршрутизация и SSR
- **Tailwind 4** — стили и адаптив
- **TypeScript** — типизация
- **Vite** — сборка и dev-сервер

Иконки: inline SVG (совместимо с Lucide-подобным стилем).

## Запуск

```bash
npm install
npm run dev
```

Приложение доступно по адресу [http://localhost:5173](http://localhost:5173).

## Сборка

```bash
npm run build
```

## Структура

- `app/routes/` — страницы (главная, товар, корзина)
- `app/components/` — Header, ProductCard
- `app/context/CartContext.tsx` — глобальная корзина и localStorage
- `app/data/products.ts` — каталог товаров и категории

---

*AgroMarket — вкус, который нельзя подделать.*
