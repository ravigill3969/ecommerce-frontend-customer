import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { refreshToken } from "@/api/user";

const baseurl = import.meta.env.VITE_BASE_URL;

type VerifyUserResponse = {
  message: string;
  userId: string;
};

type UserContextT = {
  userId: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
};

type ErrorRes = {
  status: string;
  message: string;
};

const UserContext = createContext<UserContextT | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { isError, isSuccess, isLoading, data, error, status } =
    useQuery<VerifyUserResponse>({
      queryKey: ["verifyUser"],
      queryFn: async (): Promise<VerifyUserResponse> => {
        const response = await fetch(`${baseurl}/auth/v1/verify-user`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
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
      },
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
    });

  useEffect(() => {
    if (isSuccess && data?.userId) {
      setUserId(data.userId);
      setIsAuthenticated(true);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    if (status === String(401)) {
      refreshToken();
    } else if (isError) {
      setUserId(null);
      refreshToken();

      setIsAuthenticated(false);
      const errorMessage =
        error instanceof Error ? error.message : "Please login";
      toast.error(errorMessage);
    }
  }, [isError, error, status]);

  return (
    <UserContext.Provider value={{ isAuthenticated, isLoading, userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextT => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
