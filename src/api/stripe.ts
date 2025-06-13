import { useMutation, useQueryClient } from "@tanstack/react-query";

const baseurl = import.meta.env.VITE_BASE_URL;

type ErrorRes = {
  status: string;
  message: string;
};

type CartItem = {
  productId: string;
  quantity: number;
};

type StripeProps = {
  data: CartItem[];
  cartId: string;
};
type StripeRes = {
  status: string;
  url: string;
};

export const useStripeForPayment = () => {
  const payment = async ({ data, cartId }: StripeProps): Promise<StripeRes> => {
    const response = await fetch(
      `${baseurl}/payment/v1/create-payment-intent`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ data, cartId }),
      }
    );

    const res = await response.json();

    if (!response.ok) {
      const err: ErrorRes = {
        message: res.message,
        status: res.status,
      };
      throw err;
    }

    return res;
  };

  const mutation = useMutation({
    mutationKey: ["payment"],
    mutationFn: payment,
    onSuccess: (data) => {
      window.location.href = data.url;
    },
  });

  return mutation;
};

export const useSessionIdAfterSuccessPayment = () => {
  const queryClient = useQueryClient();
  const sessionIdAfterSuccessPayment = async (sessionId: string) => {
    const response = await fetch(`${baseurl}/payment/v1/success-payment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ sessionId }),
    });

    const res = await response.json();

    if (!response.ok) {
      const err: ErrorRes = {
        message: res.message,
        status: res.status,
      };

      throw err;
    }

    return res;
  };

  const mutation = useMutation({
    mutationKey: ["sessionIdAfterSuccessPayment"],
    mutationFn: sessionIdAfterSuccessPayment,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["getUserCart"] });
    },
  });

  return mutation;
};
