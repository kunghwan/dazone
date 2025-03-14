import { useEffect } from "react";
import { Link } from "react-router-dom";
import pricfy from "../utils/pricfy";

const ProductItem = ({ id, imgs, name, price, quan, desc }: ProductProps) => {
  useEffect(() => {
    console.log(pricfy("sdfsdfsdf"));
  }, [price]);

  return (
    <div
      className="flex flex-col border rounded border-border
     "
    >
      <img
        src={imgs[0]}
        alt={name}
        width={100}
        height={100}
        className="border aspect-square object-cover  w-full "
      />

      <div className="p-2.5 font-light">
        <Link
          className="p-0 h-auto items-start hover:shadow-none hover:text-theme font-normal"
          to={`/product${id}`}
        >
          <p className="font-bold">{name}</p>
          <p className="">
            {name} is Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit perferendis est illo doloribus at recusandae
            consequuntur maxime eos vel incidunt laboriosam quibusdam officia
            itaque dolorum nemo velit animi, error quisquam?
            {name === "의자" &&
              `Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit perferendis est illo doloribus at recusandae
            consequuntur maxime eos vel incidunt laboriosam quibusdam officia
            itaque dolorum nemo velit animi, error quisquam?`}
          </p>
        </Link>
        <p className="text-2xl"> {pricfy(price)}원</p>

        <p className="text-sm text-gray-500">{quan}개 남았습니다</p>
        <button className="bg-theme text-white rounded-full text-sm mt-2">
          장바구니에 담기
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
