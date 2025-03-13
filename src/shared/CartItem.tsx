import { useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";

import { CartProps } from "../contextApi/zustand/cart.store";

const CartItem = ({ dollar, imgs, name }: CartProps) => {
  const [starButton, setStarButton] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const HandleStar = (index: number) => {
    const newStar = [...starButton];
    newStar[index] = !newStar[index];
    setStarButton(newStar);
  };

  return (
    <>
      <div className="flex grid-cols-1">
        <img src={imgs[0]} width={200} height={100} />
        <div className="w-50 p-5 gap-y-2.5 flex flex-col">
          <p>{name}</p>
          <p>{dollar}</p>
          <div className="flex text-2xl">
            {starButton.map((star, index) => (
              <span
                key={index}
                onClick={() => HandleStar(index)}
                className="text-yellow-300"
              >
                {star ? <IoStar /> : <IoStarOutline />}
              </span>
            ))}
          </div>
          <button className="rounded-2xl bg-yellow-300 cursor-pointer">
            장바구니에 추가
          </button>
        </div>
      </div>
    </>
  );
};

export default CartItem;
