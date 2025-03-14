import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";

// 컴포넌트들 lazy load
const Home = lazy(() => import("./Home"));
const Product = lazy(() => import("./Product"));
const MyAccount = lazy(() => import("./MyAccount"));
const Cart = lazy(() => import("./Cart"));
const RootLayout = lazy(() => import("../layouts/RootLayout"));
const ProductDetail = lazy(() => import("./ProductDetail"));

export default function AppRouter() {
  return (
    <Suspense
      fallback={
        <div className="fixed w-full h-screen flex flex-center flex-col gap-y-2.5">
          <CgSpinner className="text-4xl animate-spin text-theme" />
          <h1 className="animate-pulse">App is Loading...</h1>
        </div>
      }
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={RootLayout}>
            {/* 홈 페이지 */}
            <Route index Component={Home} />
            {/* 장바구니 페이지 */}
            <Route path="cart" Component={Cart} />
            {/* 마이 계정 페이지 */}
            <Route path="myaccount" Component={MyAccount} />

            {/* /product 경로에서 Product 컴포넌트 렌더링 */}
            <Route path="product" Component={Product} />

            {/* /product/:productid 경로에서 ProductDetail 컴포넌트 렌더링 */}
            <Route path="product/:productid" Component={ProductDetail} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
