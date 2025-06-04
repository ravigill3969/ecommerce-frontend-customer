import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const baseurl = import.meta.env.VITE_BASE_URL;

type LoginT = {
  email: string;
  password: string;
};
type LoginResT = {
  status: string;
  message: string;
};

type LoginErrT = {
  status: string;
  message: string;
};

export function useLogin() {
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
      const err: LoginErrT = {
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

type RegisterErrResT = {
  status: string;
  message: string;
};

export function useRegister() {
  const query = useQueryClient();

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
      const err: RegisterErrResT = {
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
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return mutate;
}
