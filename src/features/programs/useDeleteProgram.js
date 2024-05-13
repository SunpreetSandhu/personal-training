// import

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteProgram as deleteProgramApi } from "../../services/apiPrograms";

export function useDeleteProgram() {
  const queryClient = useQueryClient();
  const { isLoading: isDeleting, mutate: deleteProgram } = useMutation({
    mutationFn: deleteProgramApi,
    onSuccess: () => {
      toast.success("program successfully deleted");
      //invalidate so react query refetches data
      queryClient.invalidateQueries({
        queryKey: ["program"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteProgram };
}
