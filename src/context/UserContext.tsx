import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

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

const UserContext = createContext<UserContextT | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const { isError, isSuccess, isLoading, data, error } =
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
          throw new Error(res.message || "Authentication failed");
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
    if (isError) {
      setUserId(null);
      setIsAuthenticated(false);
      const errorMessage =
        error instanceof Error ? error.message : "Please login";
      toast.error(errorMessage);
    }
  }, [isError, error]);

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
