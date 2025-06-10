import { useStripeForPayment } from "@/api/stripe";

type CartItem = {
  productId: string;
  quantity: number;
  price: number;
  addedAt: string; // ISO string
};

type Props = {
  data: CartItem[];
};

function Stripe({ data }: Props) {
  const { mutate } = useStripeForPayment();
  const buyFunction = () => {
    console.log(data);
    mutate({ data });
  };

  return <div onClick={buyFunction}>Submit</div>;
}

export default Stripe;
