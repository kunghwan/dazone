import { useSearchParams } from "react-router-dom";
import ProductItem from "../shared/ProductItem";
<<<<<<< HEAD
import { useQuery } from "@tanstack/react-query";
import { db, FBCollection } from "../lib/firebase";
import Loading from "../shared/Loading";
=======
>>>>>>> 5ae9d4c3c84e04c73277f39b1002d40930fd488d

const Product = () => {
  const keyword = useSearchParams()[0].get("keyword");

<<<<<<< HEAD
  // const { keyword } = PRODUCT.store();
  const { data, isPending, error } = useQuery({
    queryFn: async (): Promise<ProductProps[]> => {
      const ref = db
        .collection(FBCollection.PRODUCTS)
        .where("name", "in", keyword?.split(" "));
      // .where("name", "array-contains", [keyword]);
      const snap = await ref.get();
      const data = snap.docs.map((doc) => ({
        ...(doc.data() as ProductProps),
      }));
      return data ?? [];
    },
    queryKey: ["product", "searching", keyword],
  });

  if (isPending) {
    return <Loading className="top-0" />;
  }

  if (error || !data) {
    return <h1> Error : {error.message}</h1>;
  }

  return data.length === 0 ? (
    <h1 className="mt-5 text-center">검색된 아이템이 없습니다.</h1>
  ) : (
    <ul className="grid gap-2.5 grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-300 mx-auto p-2.5">
      {data.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </ul>
  );
=======
  const product = useMemo<null | ProductProps>(() => {
    const foundItem = products.find((item) => item.id === productId);
    if (!foundItem) {
      return null;
    }
    return foundItem;
  }, [products, productId]);
  return !product ? null : <ProductItem {...product} />;
>>>>>>> 5ae9d4c3c84e04c73277f39b1002d40930fd488d
};

export default Product;
