import { useState, useCallback } from "react";
import type { Employee } from "@/pages/home/types";
import api from "@/services/api";

export function useEmployees() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchEmployees = useCallback(async (): Promise<Employee[] | null> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Employee[]>("/employees");
      return response.data;
    } catch (err) {
      setError(err as Error);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchEmployees, loading, error };
}
