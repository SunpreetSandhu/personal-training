import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast, { ToastBar } from "react-hot-toast";
import { useNavigate } from "react-router";
import { updateBooking } from "../../services/apiBookings";

export function useInprogress() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: inprogress, isLoading: isLoadingInProgress } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "in-progress",
        isPaid: true,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully initiated`);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: () => toast.error("Error occured while initiating"),
  });
  return { inprogress, isLoadingInProgress };
}
