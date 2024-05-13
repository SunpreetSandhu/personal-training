import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditProgram } from "../../services/apiPrograms";

export function useEditProgram() {
  const queryClient = useQueryClient();
  const { mutate: editProgram, isLoading: isEditing } = useMutation({
    mutationFn: ({ newProgramData, id }) =>
      createEditProgram(newProgramData, id),
    onSuccess: () => {
      toast.success("Program successfully edited");
      queryClient.invalidateQueries({
        queryKey: ["program"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isEditing, editProgram };
}
