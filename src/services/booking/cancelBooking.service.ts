import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type ICancelBooking = {
  booking_id: string;
};

const cancelBooking = async (props: ICancelBooking) => {
  try {
    const res = await axiosAPIWithoutAuth.post<object>(
      `/bookings/${props.booking_id}/cancel`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default cancelBooking;
