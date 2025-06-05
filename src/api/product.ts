import { useQuery } from "@tanstack/react-query";

const baseurl = import.meta.env.VITE_BASE_URL;

type GetAllProdResErr = {
  status: string;
  message: string;
};

export interface Product {
  _id: string;
  productName: string;
  sellerID: string;
  price: number;
  stockQuantity: number;
  brand: string;
  category: string;
  description: string;
  isActive: boolean;
  photoURLs: string[];
  createdAt: string; // or Date if parsed
  updatedAt: string;
  __v: number;
}

export interface ProductResponse {
  success: boolean;
  count: number;
  message: string;
  products: Product[];
}

export const useGetAllProducts = () => {
  const getAllProducts = async (): Promise<ProductResponse> => {
    const response = await fetch(`${baseurl}/product/v1/get-all-products`, {
      method: "GET",
    });

    const res = await response.json();

    if (!response.ok) {
      if (!response.ok) {
        const err: GetAllProdResErr = {
          status: res.status || "error",
          message: res.message || "Something went wrong",
        };
        throw err;
      }
    }
    console.log(res);

    return res;
  };
  const query = useQuery({
    queryKey: ["getAllProducts"],
    queryFn: getAllProducts,
  });
  return query;
};
