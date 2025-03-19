import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import AppRouter from "./routes/AppRouter";
import { AuthProvider, Card } from "./contextApi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CartProvider from "./routes/CartProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        {/* <CartProvider> */}
        <AppRouter />
        {/* </CartProvider> */}
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
