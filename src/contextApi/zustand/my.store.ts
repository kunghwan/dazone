import { create } from "zustand";

export interface Props {
  target: Target;
  changeTarget: PropsFunc<Target>;
}

<<<<<<< HEAD
export type Target = "기본정보" | "비밀번호변경" | "상품등록" | "나의상품";
=======
export type Target = "기본정보" | "비밀번호변경";
>>>>>>> 5ae9d4c3c84e04c73277f39b1002d40930fd488d

export const store = create<Props>((set) => ({
  target: "기본정보",
  changeTarget: (newTarget) => set((prev) => ({ ...prev, target: newTarget })),
}));
