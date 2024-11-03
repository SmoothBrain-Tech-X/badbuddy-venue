import getBookings, {
  type IGetBookings,
} from "@/services/booking/getBookings.service";
import { useQuery } from "@tanstack/react-query";

const useGetBookings = (props?: IGetBookings) => {
  return useQuery({
    queryKey: ["useGetBookings"],
    queryFn: () => getBookings(props),
  });
};

export default useGetBookings;
