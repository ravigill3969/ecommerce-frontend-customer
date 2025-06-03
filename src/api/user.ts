import { useMutation } from "@tanstack/react-query";

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
  const login = async (data: LoginT): Promise<LoginResT> => {
    const response = await fetch(`${baseurl}/auth/v1/login`, {
      method: "POST",
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
  });

  return mutate;
}
