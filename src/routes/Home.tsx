// import { useEffect } from "react";
import { PRODUCT } from "../contextApi";
import ProductItem from "../shared/ProductItem";

const Home = () => {
  // useEffect(() => {
  //   const subscribe = db.collection("products").onSnapShot(() => {
  //     const data = snap.docs.map(() => ({ ...docs.data() }));

  //     console.log(data)
  //   });

  //   return subscribe
  // }, []);

  const { products } = PRODUCT.store();
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-300 mx-auto px-5">
      {products.map((product) => {
        return <ProductItem key={product.id} {...product} />;
      })}
    </div>
  );
};

export default Home;
