import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loading from "../shared/Loading";
import { AUTH } from "../contextApi/context";

const Home = lazy(() => import("./Home"));
const Product = lazy(() => import("./Product/Product"));
const MyAccount = lazy(() => import("./MyAccount/MyAccount"));
const Cart = lazy(() => import("./Cart/Cart"));
const RootLayout = lazy(() => import("../layouts/RootLayout"));
const ProductDetail = lazy(() => import("./Product/ProductDetail"));
const Signup = lazy(() => import("./Signup"));
const Order = lazy(() => import("./Order/Order"));
const NotFound = lazy(() => import("./NotFound"));
const Text = lazy(() => import("./Text"));

export default function AppRouter() {
  const { user } = AUTH.use();
  return (
    <Suspense fallback={<Loading />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={RootLayout}>
            <Route index Component={Home} />
            <Route path="*" Component={NotFound} />
            <Route path="text" Component={Text} />

            <Route path="signup" Component={Signup} />
            <Route path="product">
              <Route index Component={Product} />
              <Route path=":pid" Component={ProductDetail} />
            </Route>
            <Route path="myAccount" element={<MyAccount user={user} />} />

            {user && (
              <>
                <Route path="myAccount" element={<MyAccount {...user} />} />
                <Route path="orders">
                  <Route index element={<Order {...user} />} />
                  <Route path=":oid" element={<>order item</>} />
                </Route>
                <Route path="cart">
                  <Route index element={<Cart {...user} />} />
                </Route>
              </>
            )}
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
}
