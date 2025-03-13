import { create } from "zustand";
export interface CartSilder {
  imgs: string[];
  name: string;
}

export interface Props {
  Silder1: CartSilder[];
}

export const useStore = create<Props>(() => ({
  Silder1: [
    {
      imgs: [
        "https://cdn.pixabay.com/photo/2025/01/26/08/38/heart-9360465_640.jpg",
      ],
      name: "1",
    },
    {
      imgs: [
        "https://cdn.pixabay.com/photo/2023/01/30/14/50/women-7755902_640.png",
      ],
      name: "2",
    },
    {
      imgs: [
        "https://cdn.pixabay.com/photo/2024/06/19/08/18/woman-8839452_640.jpg",
      ],
      name: "3",
    },
    {
      imgs: [
        "https://cdn.pixabay.com/photo/2023/11/17/01/50/pine-8393456_640.jpg",
      ],
      name: "4",
    },
  ],
}));
