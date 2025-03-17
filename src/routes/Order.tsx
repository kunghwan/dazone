import { useQuery } from "@tanstack/react-query";
import { db, FBCollection } from "../lib/firebase";
import { AUTH } from "../contextApi";
import Loading from "../shared/Loading";
import pricfy from "../utils/pricfy";
import { getFromNow } from "../utils/dayjs";

const Order = () => {
  const { user } = AUTH.use();

  const { data, error, isLoading } = useQuery({
    queryKey: ["order", user?.uid],
    queryFn: async (): Promise<OrderProps[]> => {
      if (!user) {
        return [];
      }

      const ref = db.collection("createAt", "desc").get();
      const snap = await ref.get();
      const data = snap.docs.map((doc) => ({
        ...(doc.data() as OrderProps),
      }));

      return data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error instanceof Error) {
    return <>Error {error.message}</>;
  }

  return (
    <div>
      {data?.length}
      {data?.map((item) => (
        <div key={item.orderId} className="border">
          <h1>{item.orderName}</h1>
          <p>{pricfy(item.amount.value)}</p>
          <p>{getFromNow(item.createdAt)}</p>
        </div>
      ))}
    </div>
  );
};

export default Order;
