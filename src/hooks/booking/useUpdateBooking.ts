import updateBooking from "@/services/booking/updateBooking.service";
import { useMutation } from "@tanstack/react-query";

const useUpdateBooking = () => {
  return useMutation({
    mutationFn: updateBooking,
  });
};

export default useUpdateBooking;
