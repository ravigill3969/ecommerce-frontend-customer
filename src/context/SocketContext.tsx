// context/SocketContext.tsx
import React, {
  createContext,
  useContext,
  useEffect,
  useCallback,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";
import { useUser } from "./UserContext";
import { useGetUserCart, type GetCartAPIResponse } from "@/api/cart";
import toast from "react-hot-toast";

const baseurl = import.meta.env.VITE_BASE_URL;
const socket: Socket = io(baseurl);

type SocketContextT = {
  incrementInCart: (productId: string) => void;
  decrementInCart: (productId: string) => void;
  res: GetCartAPIResponse | null;
  totalItemsInCart: number | undefined;
};

const SocketContext = createContext<SocketContextT | undefined>(undefined);

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const { userId } = useUser();

  const [res, setRes] = useState<GetCartAPIResponse | null>(null);

  function increment(productId: string) {
    setRes((prev) => {
      if (!prev) return prev;

      const updatedItems = prev.cart.items.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            quantity: item.quantity + 1,
          };
        }
        return item;
      });

      return {
        ...prev,
        cart: {
          ...prev.cart,
          items: updatedItems,
        },
      };
    });
  }

  function decrement(productId: string) {
    setRes((prev) => {
      if (!prev) return prev;

      const updatedItems = prev.cart.items
        .map((item) => {
          if (item.productId === productId) {
            const newQuantity = item.quantity - 1;
            if (newQuantity <= 0) return null;
            return {
              ...item,
              quantity: newQuantity,
            };
          }
          return item;
        })
        .filter(
          (item): item is (typeof prev.cart.items)[number] => item !== null
        );

      return {
        ...prev,
        cart: {
          ...prev.cart,
          items: updatedItems,
        },
      };
    });
  }

  const { data } = useGetUserCart();

  const totalItemsInCart = data?.cart.items.length;

  useEffect(() => {
    if (data) {
      setRes(data);
    }

    const handleIncrement = (data: {
      productId: string;
      success: boolean;
      message: string;
    }) => {
      if (data.success) {
        increment(data.productId);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    };

    const handleDecrement = (data: {
      productId: string;
      success: boolean;
      message: string;
    }) => {
      if (data.success) {
        decrement(data.productId);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    };

    socket.on("cart-updated-increment", handleIncrement);
    socket.on("cart-updated-decrement", handleDecrement);

    return () => {
      socket.off("cart-updated-increment", handleIncrement);
      socket.off("cart-updated-decrement", handleDecrement);
    };
  }, [data]);

  const incrementInCart = useCallback(
    (productId: string) => {
      socket.emit("cart-increment", { productId, userId });
    },
    [userId]
  );

  const decrementInCart = useCallback(
    (productId: string) => {
      socket.emit("cart-decrement", { productId, userId });
    },
    [userId]
  );

  return (
    <SocketContext.Provider
      value={{ incrementInCart, decrementInCart, res, totalItemsInCart }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export function useSocketForCart() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocketForCart must be used within a SocketProvider");
  }
  return context;
}
