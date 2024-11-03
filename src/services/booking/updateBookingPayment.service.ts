import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type IUpdateBookingPayment = {
  booking_id: string;
  payment_method: string;
  status: string;
};

const updateBookingPayment = async (props: IUpdateBookingPayment) => {
  try {
    const payload = _.omit(props, ["booking_id"]);
    const res = await axiosAPIWithoutAuth.put<object>(
      `/bookings/${props.booking_id}/payment`,
      payload,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default updateBookingPayment;
