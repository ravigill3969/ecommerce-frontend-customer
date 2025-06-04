import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
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
  refetch: () => void;
};

const UserContext = createContext<UserContextT | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [hasNavigated, setHasNavigated] = useState(false);
  const navigate = useNavigate();

  const { 
    isError, 
    isSuccess, 
    isLoading, 
    data, 
    error,
    refetch 
  } = useQuery<VerifyUserResponse>({
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

  // Handle successful authentication
  useEffect(() => {
    if (isSuccess && data?.userId) {
      setUserId(data.userId);
      
      // Only navigate to home if we're currently on login/register pages
      // and haven't already navigated
      const currentPath = window.location.pathname;
      const authPages = ['/login', '/register', '/signup'];
      
      if (authPages.includes(currentPath) && !hasNavigated) {
        navigate("/", { replace: true });
        setHasNavigated(true);
      }
    }
  }, [isSuccess, data, navigate, hasNavigated]);

  // Handle authentication errors
  useEffect(() => {
    if (isError) {
      setUserId(null);
      
      // Only show error toast and navigate if we're not already on auth pages
      const currentPath = window.location.pathname;
      const authPages = ['/login', '/register', '/signup'];
      
      if (!authPages.includes(currentPath)) {
        const errorMessage = error instanceof Error ? error.message : "Please login";
        toast.error(errorMessage);
        navigate("/login", { replace: true });
      }
    }
  }, [isError, error, navigate]);

  // Reset hasNavigated when query state changes
  useEffect(() => {
    if (isLoading) {
      setHasNavigated(false);
    }
  }, [isLoading]);

  const contextValue: UserContextT = {
    userId,
    isLoading,
    isAuthenticated: !!userId && !isError,
    refetch,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextT => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};