import { useQuery } from "@tanstack/react-query";
import { api } from "../api/client";

export function useSystemStatus() {
  return useQuery({
    queryKey: ["system-status"],
    queryFn: async () => {
      const { data } = await api.get<{
        application: string;
        phase: number;
        authenticationEnabled: boolean;
        propertyBrowsingEnabled: boolean;
      }>("/system/status");
      return data;
    },
    staleTime: 60_000,
    retry: false,
  });
}
