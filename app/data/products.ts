export type ProductCategory = "Мясо" | "Молочка" | "Выпечка" | "Напитки" | "Мёд" | "Овощи";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  specs: { [key: string]: string };
  images: string[];
  stock: number;
  isAvailable: boolean;
}

export const products: Product[] = [
  {
    id: "govyadina-vyrezka",
    name: "Говядина (вырезка)",
    category: "Мясо",
    description:
      "Сочная вырезка говядины от местных фермеров. Идеально подходит для стейков и жаркого.",
    price: 1890,
    specs: { "Вес": "1 кг", "Хранение": "Охлаждённое", "Ферма": "Эко-Нива" },
    images: ["/images/beef.jpg"],
    stock: 15,
    isAvailable: true,
  },
  {
    id: "fermerskij-syr",
    name: "Фермерский сыр",
    category: "Молочка",
    description:
      "Домашний сыр из цельного молока. Созревание от 6 месяцев. Плотная текстура и ореховые ноты.",
    price: 1650,
    specs: { "Вес": "400 г", "Жирность": "45%", "Тип": "Твёрдый" },
    images: ["/images/cheese.jpg"],
    stock: 10,
    isAvailable: true,
  },
  {
    id: "kopchenaya-kolbasa",
    name: "Копченая колбаса",
    category: "Мясо",
    description:
      "Традиционная копченая колбаса из натурального мяса. Без консервантов и добавок.",
    price: 1200,
    specs: { "Вес": "500 г", "Тип": "Копченая", "Состав": "Мясо и специи" },
    images: ["/images/sausage.jpg"],
    stock: 20,
    isAvailable: true,
  },
  {
    id: "domashnee-moloko",
    name: "Домашнее молоко",
    category: "Молочка",
    description:
      "Парное молоко с утренней дойки. Сохранены все природные ферменты и польза.",
    price: 220,
    specs: { "Объём": "1 л", "Жирность": "4%", "Срок": "3 суток" },
    images: ["/images/milk.jpg"],
    stock: 40,
    isAvailable: true,
  },
  {
    id: "svezhie-tomat",
    name: "Свежие томаты",
    category: "Овощи",
    description:
      "Спелые томаты с органической фермы. Идеальны для салатов и консервирования.",
    price: 150,
    specs: { "Вес": "1 кг", "Сорт": "Черри", "Регион": "Краснодар" },
    images: ["https://images.unsplash.com/photo-1582281298055-e25c5c25d5c8?auto=format&fit=crop&q=80&w=800"],
    stock: 30,
    isAvailable: true,
  },
];
