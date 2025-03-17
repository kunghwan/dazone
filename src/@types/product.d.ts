interface ProductProps {
  name: string;
  quan: number;
  price: string;
  id: string;
  imgs: string[];
  desc: string;
}

interface CartProps extends ProductProps {
  creatdAt: string;
}

interface OrderProps {
  amount: OrderAmount;
  method: OrderMethod;
  orderId: string;
  orderName: string;
  items: [items: ProductProps[]];
  createdAt: string;
}

interface OrderAmount {
  curreny: "KRW" | "";
  value: number;
}

type OrderMethod = "CARD" | "";
