import { useContext, createContext } from "react";

export interface Props {
  cart: CartProps[];
  addToCart: (item: CartProps[]) => Promise<PromiseResult>;
  removeAnItem: (id: CartProps[]) => Promise<PromiseResult>;
  emptyCart: () => Promise<PromiseResult>;
  updateAnItem: (item: CartProps[]) => Promise<PromiseResult>;
  placeOrder: (items: CartProps[]) => Promise<PromiseResult>;

  isPending: boolean;
  error: null | Error;
}

export const initialstate: Props = {
  cart: [],
  addToCart: async () => ({}),
  removeAnItem: async () => ({}),
  emptyCart: async () => ({}),
  placeOrder: async () => ({}),
  updateAnItem: async () => ({}),
  isPending: true,
  error: null,
};

export const context = createContext(initialstate);

export const use = () => useContext(context);
