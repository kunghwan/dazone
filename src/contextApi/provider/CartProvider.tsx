import { useState, useCallback, PropsWithChildren } from "react";
import { AUTH, CART } from "../context";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { db, FBCollection } from "../../lib/firebase";

// CartProvider 컴포넌트
const CartProvider = ({ children }: PropsWithChildren) => {
  const { user } = AUTH.use();
  const queryKey = ["cart"];

  // Cart 데이터를 가져오는 useQuery
  const { data, isLoading, error } = useQuery({
    queryKey,
    queryFn: async (): Promise<CartProps[]> => {
      if (!user) {
        return [];
      }

      // Firestore에서 데이터를 가져옵니다.
      const ref = db.collection(FBCollection.CART).orderBy("createAt", "desc");
      const snap = await ref.get();
      const data = snap.docs.map((doc) => ({
        ...(doc.data() as CartProps),
        id: doc.id, // Firestore의 id를 추가
      }));

      return data ?? [];
    },
  });

  const queryClient = useQueryClient();

  const invalidate = useCallback(
    () => queryClient.invalidateQueries(queryKey),
    [queryClient]
  );

  // Mutation을 사용하여 Cart 작업 처리
  const mutation = useMutation({
    mutationFn: async (
      action: keyof CART.Props,
      item: (CartProps | ProductProps)[]
    ): Promise<PromiseResult> => {
      const ref = db.collection(FBCollection.CART);
      try {
        switch (action) {
          case "addToCart":
            // 장바구니에 아이템 추가
            await ref.doc(item[0].id).set(item[0]);
            console.log('done adding!')
            return { success: true };

          case "removeAnItem":
            // 장바구니에서 아이템 삭제
            await ref.doc(item[0].id).delete();
            return { success: true };

          case "updateAnItem":
            // 장바구니 아이템 업데이트
            await ref.doc(item[0].id).update(item[0]);
            return { success: true };

          case "emptyCart":
            // 장바구니 비우기
            const snap = await ref.get();
            snap.docs.forEach(async ({doc}) => {
              await ref.doc(doc.id).delete();
              console.log("deleted", doc.id);
            });
            return { success: true };

          case "placeOrder":
            // 주문 완료 후 장바구니 비우기
            for (const item of item) {
              await ref.doc(item.id).delete();
            }
            return { success: true };

          default:
            return { success: false, message: "함수가 아닙니다." };
        }
      } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
      }
    },
    onSuccess: ({ message, success }) => {
      if (!success && message) {
        return alert(message);
      }

      queryClient.invalidateQueries({ queryKey });
    },

    onError: (error) => {
      alert(error.message);
    },
  });

  const addToCart = useCallback(
    async ():Promise<Promise<PromiseResult> => {
      const res = await mutation.mutateAsync
    }
  const removeAnItem = useCallback(
    async ():Promise<Promise<PromiseResult> => {
      const res = await mutation.mutateAsync
    }
  ,[mutation]
  const updateAnItem = useCallback(
    async ():Promise<Promise<PromiseResult> => {
      const res = await mutation.mutateAsync
    },[mutation]
  const placeOrder = useCallback(
    async ():Promise<Promise<PromiseResult> => {
      const res = await mutation.mutateAsync
    },[mutation]
  )

  return (
    <CART.context.Provider
      value={{
        error,
        isPending: isLoading,
        cart: data ?? [],
        mutation, // mutation을 context에 추가
        addToCart,emptyCart,placeOrder,removeAnItem,updateAnItem
      }}
    >
      {children}
    </CART.context.Provider>
  );
};

export default CartProvider;
