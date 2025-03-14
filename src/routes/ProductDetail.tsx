import { useEffect, useState,useCallback } from "react";
import { useParams } from "react-router-dom";
import { PRODUCT } from "../contextApi";
import Loading from "../shared/Loading";

const ProductDetail = () => {
  const { pid } = useParams<{ pid?: string }>();
  const { products } = PRODUCT.store();

  const [isPending, setIsPending] = useState(true);
  const [product, setProduct] = useState<null | ProductProps>(null);

  const fetchProduct = (pid?: string):Promise <ProductProps | string> => {
    newPromise(
        (resolve) => {
            setTimeout(
                () => {
                    
                    if (!pid) {
                      return "상품아이디가 존재 x";
                    }
                },return resolve(foundProduct)
            )
        }
    )
    setIsPending(true);
    const foundProduct = products.find((item) => item.id === pid);

    if (!foundProduct) {
      return "해당 상품 존재 x";
    }

    return foundProduct;
  };

  useEffect(() => {
    const fn = () => {
      setIsPending(true);
      const res = fetchProduct(pid);
      if (typeof res === "string") {
        setProduct(null);
        return alert(res);
      } else {
        setProduct(res);
      }
      setIsPending(false);
    };
    fetchProduct(pid);

    fn();

    return () => {
      fn();
    };
  }, [pid, fetchProduct]);

  return !product || isPending ? (
  <Loading/>
  ) : (
    <div>
      <p>{product.name}</p>
      <p></p>
      <p></p>
      <p></p>
    </div>
  );
};

export default ProductDetail;
