import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const baseurl = import.meta.env.VITE_BASE_URL;

type AddItemToCartOrCreateCartSuccessRes = {
  success: boolean;
  message: string;
};

type AddItemToCartOrCreateCartAsInput = {
  productId: string;
  price: number;
};

type AddItemToCartOrCreateCartErrorRes = {
  status: string;
  message: string;
};

export const useAddItemToCartOrCreateCart = () => {
  // const query = useQueryClient();
  const addItemToCartOrCreateCart = async (
    data: AddItemToCartOrCreateCartAsInput
  ): Promise<AddItemToCartOrCreateCartSuccessRes> => {
    const response = await fetch(`${baseurl}/cart/v1/create-cart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      const err: AddItemToCartOrCreateCartErrorRes = {
        status: res.status || false,
        message: res.message || "something went wrong!",
      };

      throw err;
    }

    return res;
  };

  const mutate = useMutation({
    mutationKey: ["addItemToCartOrCreateCart"],
    mutationFn: addItemToCartOrCreateCart,
    onSuccess(data) {
      toast.success(data.message);
      // query.invalidateQueries({ queryKey: ["getUserCart"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return mutate;
};

type GetUserCartErrResT = {
  status: string;
  message: string;
};

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  addedAt: string; // ISO string
}

export interface CartResponse {
  _id: string;
  userId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ProductResponse {
  _id: string;
  productName: string;
  sellerID: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand: string;
  description: string;
  photoURLs: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetCartAPIResponse {
  success: boolean;
  message: string;
  cart: CartResponse;
  products: ProductResponse[];
}

export const useGetUserCart = () => {
  const getUserCart = async (): Promise<GetCartAPIResponse> => {
    const response = await fetch(`${baseurl}/cart/v1/get-cart`, {
      credentials: "include",
    });

    const res = await response.json();

    if (!response.ok) {
      const err: GetUserCartErrResT = {
        message: res.message,
        status: res.status,
      };

      throw err;
    }

    return res;
  };

  const query = useQuery({
    queryKey: ["getUserCart"],
    queryFn: getUserCart,
  });
  return query;
};

type ErrorRes = {
  status: string;
  message: string;
};

interface Item {
  _id: string;
  productId: string;
  quantity: number;
  price: number;
 
}

interface Cart {
  _id: string;
  userId: string;
  status: string;
  items: Item[];
  createdAt: string;
  updatedAt?: string;
}

interface OrdersResponse {
  status: string;
  message: string;
  carts: Cart[];
}

export const useGetAlreadyPaidOrderOrCart = () => {
  const getOrders = async (): Promise<OrdersResponse> => {
    const response = await fetch(`${baseurl}/cart/v1/get-paid-orders`, {
      method: "GET",
      credentials: "include",
    });

    const res = await response.json();

    if (!response.ok) {
      const err: ErrorRes = {
        message: res.message || "something went wrong",
        status: res.status || "error",
      };

      throw err;
    }

    return res;
  };

  const query = useQuery({
    queryKey: ["getOrders"],
    queryFn: getOrders,
  });

  return query;
};

type RemoveItemFromCart = {
  productID: string;
  cartID: string;
};

type RemoveItemFromCartRes = {
  status: string;
  message: string;
};

export const useRemoveItemFromCart = () => {
  const query = useQueryClient();
  const removeItemFromCart = async (
    data: RemoveItemFromCart
  ): Promise<RemoveItemFromCartRes> => {
    const response = await fetch(`${baseurl}/cart/v1/remove-item-cart`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    if (!response.ok) {
      const err: ErrorRes = {
        status: res.status || false,
        message: res.message || "something went wrong!",
      };

      throw err;
    }

    return res;
  };

  const mutate = useMutation({
    mutationKey: ["removeItemFromCart"],
    mutationFn: removeItemFromCart,
    onSuccess(data) {
      toast.success(data.message);
      query.invalidateQueries({ queryKey: ["getUserCart"] });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return mutate;
};
