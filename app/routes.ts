import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("product/:id", "routes/product.$id.tsx"),
  route("cart", "routes/cart.tsx"),
  route("auth", "routes/auth.tsx"),
  route("about", "routes/about.tsx"),
  route("delivery", "routes/delivery.tsx"),
  route("contacts", "routes/contacts.tsx"),
  route("station-control-hidden", "routes/admin.tsx"),
] satisfies RouteConfig;
