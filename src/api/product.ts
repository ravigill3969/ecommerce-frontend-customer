import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const baseurl = import.meta.env.VITE_BASE_URL;

type ErrorRes = {
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
        const err: ErrorRes = {
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

type WishListResT = {
  status: string;
  message: string;
};

export const useAddProductToWishList = () => {
  const addProductToWishlist = async (productId: {
    productId: string;
  }): Promise<WishListResT> => {
    const response = await fetch(`${baseurl}/product/v1/add-to-wishlist`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(productId),
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

  const mutate = useMutation({
    mutationFn: addProductToWishlist,
    mutationKey: ["addProductToWishlist"],
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  return mutate;
};

export const useRemoveProductFromoWishList = () => {
  const removeProductFromWishlist = async (productId: {
    productId: string;
  }): Promise<WishListResT> => {
    const response = await fetch(`${baseurl}/product/v1/remove-from-wishlist`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(productId),
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

  const mutate = useMutation({
    mutationFn: removeProductFromWishlist,
    mutationKey: ["removeProductFromWishlist"],
    onSuccess: (data) => {
      toast.success(data.message || "success");
    },
  });

  return mutate;
};

type GetWishListResT = {
  message: string;
  status: string;
  products: Product[];
};

export const useGetUserWishlistProducts = () => {
  const getWishlistProducts = async (): Promise<GetWishListResT> => {
    const response = await fetch(
      `${baseurl}/product/v1/get-wishlist-products`,
      {
        method: "GET",
        credentials: "include",
      }
    );

    const res = await response.json();

    if (!response.ok) {
      if (!response.ok) {
        const err: ErrorRes = {
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
    queryKey: ["getWishlistProducts"],
    queryFn: getWishlistProducts,
  });
  return query;
};

type ProductQueryParams = {
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sortBy?: string;
  order?: "asc" | "desc" | "undefined";
  page?: string;
  limit?: number;
};

export interface Product {
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
  stripeProductId: string | null;
}

export interface ProductSearchResponse {
  status: "success";
  results: number;
  page: number;
  totalPages: number;
  totalItems: number;
  data: {
    products: Product[];
  };
}

export const useSearchProducts = (params: ProductQueryParams) => {
  const query = useQuery({
    queryKey: ["searchProducts", params],
    queryFn: async (): Promise<ProductSearchResponse> => {
      const urlParams = new URLSearchParams();

      if (params.search) urlParams.append("q", params.search);
      if (params.category)
        urlParams.append("category", params.category.toLowerCase());
      if (params.minPrice !== undefined)
        urlParams.append("minPrice", params.minPrice.toString());
      if (params.maxPrice !== undefined)
        urlParams.append("maxPrice", params.maxPrice.toString());
      if (params.sortBy) urlParams.append("sortBy", params.sortBy);
      if (params.order) urlParams.append("order", params.order);
      if (params.page) urlParams.append("page", params.page.toString());
      if (params.limit) urlParams.append("limit", params.limit.toString());

      const response = await fetch(
        `${baseurl}/product/v1/search?${urlParams.toString()}`,
        {
          method: "GET",
          credentials: "include",
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
    },
  });

  return query;
};

// Represents a single product item
export interface Product {
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
  createdAt: string; // or Date if you want to parse it
  updatedAt: string;
  __v: number;
  stripeProductId: string | null;
}

export interface ProductData {
  products: Product[];
}

export interface GetLatestProductsResponse {
  status: string;
  results: number;
  data: ProductData;
}

export const useGetLatestProducts = () => {
  const getLatestProducts = async (): Promise<GetLatestProductsResponse> => {
    const response = await fetch(`${baseurl}/product/v1/recent-add-products`, {
      credentials: "include",
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

  const query = useQuery({
    queryKey: ["GetLatestProducts"],
    queryFn: getLatestProducts,
  });

  return query;
};
