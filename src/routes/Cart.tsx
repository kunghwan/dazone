import { CART } from "../contextApi";
import CartItem from "../shared/CartItem";
import CartSlider from "../shared/CartSlider";

const Cart = () => {
  const { carts } = CART.store();

  return (
    <div className="border border-red-800 rounded p-5">
      {/* <div>
        {carts.map((ca) => {
          return <CartItem key={ca.name} {...ca} />;
        })}
      </div> */}
      {/* <div>
        <CartSlider />
      </div> */}
    </div>
  );
};

export default Cart;
