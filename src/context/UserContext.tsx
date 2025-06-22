import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const { isError, isSuccess, isLoading, data } = useQuery<VerifyUserResponse>({
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
        if (response.status === 401) {
          refreshToken().then(() => {
            queryClient.invalidateQueries({ queryKey: ["verifyUser"] });
          });
        }
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
    if (isError) {
      setUserId(null);
      setIsAuthenticated(false);
    }
  }, [isError]);

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
