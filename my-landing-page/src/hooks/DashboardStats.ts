import { useEffect, useState } from "react";
import type { DashboardStats } from "../types";

export function useDashboardStats() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      setIsLoading(false);
      setError("Not logged in");
      return;
    }

    fetch("http://localhost:3000/users/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load dashboard stats");
        }

        return response.json();
      })
      .then((json: DashboardStats) => {
        setData(json);
        setIsLoading(false);
      })
      .catch((err: Error) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  return { data, isLoading, error };
}
