import { create } from "zustand";

export interface CartProps {
  imgs: string[];
  name: string;
  dollar: string;
}

export interface Props {
  carts: CartProps[];
}

export const store = create<Props>(() => ({
  carts: [
    {
      imgs: [
        "https://cdn.pixabay.com/photo/2023/08/06/14/34/woman-8173091_640.jpg",
      ],
      name: "가방",
      dollar: "5000$",
    },
    {
      imgs: [
        "https://cdn.pixabay.com/photo/2024/02/08/04/37/vietnam-8560196_640.jpg",
      ],
      name: "실험2",
      dollar: "50010$",
    },
    {
      imgs: [
        "https://cdn.pixabay.com/photo/2022/10/24/21/58/trees-7544451_640.jpg",
      ],
      name: "실험3",
      dollar: "50030$",
    },
  ],
}));
