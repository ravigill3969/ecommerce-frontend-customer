import { useStripeForPayment } from "@/api/stripe";

type CartItem = {
  productId: string;
  quantity: number;
  price: number;
  addedAt: string;
};

type Props = {
  data: CartItem[];
  cartId: string;
};

function Stripe({ data, cartId }: Props) {
  const { mutate, isPending } = useStripeForPayment();
  const buyFunction = () => {
    console.log(cartId);
    mutate({ data, cartId });
  };

  return (
    <button
      onClick={buyFunction}
      disabled={isPending}
      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
    >
      <div>Submit</div>
    </button>
  );
}

export default Stripe;
