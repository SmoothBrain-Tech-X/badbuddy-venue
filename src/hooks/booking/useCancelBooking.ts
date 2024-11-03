import cancelBooking from "@/services/booking/cancelBooking.service";
import { useMutation } from "@tanstack/react-query";

const useCancelBooking = () => {
  return useMutation({
    mutationFn: cancelBooking,
  });
};

export default useCancelBooking;
