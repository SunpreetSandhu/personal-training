import { useQuery } from "@tanstack/react-query";
import { getPrograms } from "../../services/apiPrograms";

export function usePrograms() {
  const {
    isLoading,
    data: programs,
    error,
  } = useQuery({
    queryKey: ["program"],
    queryFn: getPrograms,
  });
  return { isLoading, error, programs };
}
