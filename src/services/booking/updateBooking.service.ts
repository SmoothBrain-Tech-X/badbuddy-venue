import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type IUpdateBooking = {
  booking_id: string;
  status: string;
};

const updateBooking = async (props: IUpdateBooking) => {
  try {
    const payload = _.omit(props, ["booking_id"]);
    const res = await axiosAPIWithoutAuth.put<object>(
      `/bookings/${props.booking_id}`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default updateBooking;
