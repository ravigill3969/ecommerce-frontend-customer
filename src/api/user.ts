import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

const baseurl = import.meta.env.VITE_BASE_URL;

type LoginT = {
  email: string;
  password: string;
};
type LoginResT = {
  status: string;
  message: string;
};

type ErrorRes = {
  status: string;
  message: string;
};

export function useLogin() {
  const navigate = useNavigate();
  const query = useQueryClient();
  const login = async (data: LoginT): Promise<LoginResT> => {
    const response = await fetch(`${baseurl}/auth/v1/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();

    if (!response.ok) {
      const err: ErrorRes = {
        status: res.status || "error",
        message: res.message || "Login failed",
      };
      throw err;
    }

    return res;
  };

  const mutate = useMutation({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries({ queryKey: ["verifyUser"] });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
}

type RegisterT = {
  email: string;
  password: string;
  name: string;
};

type RegisterSuccResT = {
  status: string;
  message: string;
};

export function useRegister() {
  const query = useQueryClient();
  const navigate = useNavigate();

  const register = async (data: RegisterT): Promise<RegisterSuccResT> => {
    const response = await fetch(`${baseurl}/auth/v1/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    });
    const res = await response.json();

    if (!response.ok) {
      const err: ErrorRes = {
        status: res.status || "error",
        message: res.message || "Login failed",
      };
      throw err;
    }

    return res;
  };

  const mutate = useMutation({
    mutationKey: ["register"],
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.message);
      query.invalidateQueries({ queryKey: ["verifyUser"] });
      navigate("/");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  prevOrders: string[]; // Adjust if it's not just IDs
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface VerifiedUserResponse {
  message: string;
  user: User;
}

export const useGetCurrentUser = () => {
  const getCurrentUserInfo = async (): Promise<VerifiedUserResponse> => {
    const response = await fetch(`${baseurl}/auth/v1/get-current-user`, {
      method: "GET",
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
    console.log(res.message);
    return res;
  };

  const query = useQuery({
    queryKey: ["getCurrentUserInfo"],
    queryFn: getCurrentUserInfo,
  });

  return query;
};

export const useUpdateUserInfo = () => {
  const getCurrentUserInfo = async (data: {
    name: string;
    email: string;
    password: string;
  }): Promise<VerifiedUserResponse> => {
    const response = await fetch(`${baseurl}/auth/v1/update-current-user`, {
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
        message: res.message,
        status: res.status,
      };
      throw err;
    }
    console.log(res.message);
    return res;
  };

  const mutate = useMutation({
    mutationKey: ["getCurrentUserInfo"],
    mutationFn: getCurrentUserInfo,
    onSuccess(data) {
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return mutate;
};

export const useUpdateUserPassword = () => {
  const updateUserPassword = async (data: {
    currentPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  }): Promise<VerifiedUserResponse> => {
    const response = await fetch(
      `${baseurl}/auth/v1/update-current-user-password`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
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

  const mutate = useMutation({
    mutationKey: ["updateUserPassword"],
    mutationFn: updateUserPassword,
    onSuccess(data) {
      toast.success(data.message);
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  return mutate;
};
