import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditProgram } from "../../services/apiPrograms";

export function useCreateProgram() {
  const queryClient = useQueryClient();
  const { mutate: createProgram, isLoading: isCreating } = useMutation({
    mutationFn: createEditProgram,
    onSuccess: () => {
      toast.success("New program successfully created");
      queryClient.invalidateQueries({
        queryKey: ["program"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createProgram };
}
