import updateBooking from "@/services/booking/updateBooking.service";
import updateBookingPayment from "@/services/booking/updateBookingPayment.service";
import { useMutation } from "@tanstack/react-query";

const useUpdateBookingPayment = () => {
  return useMutation({
    mutationFn: updateBookingPayment,
  });
};

export default useUpdateBookingPayment;
