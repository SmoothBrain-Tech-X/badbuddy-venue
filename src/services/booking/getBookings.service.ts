import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

interface RootObject {
  bookings: Booking[];
  total: number;
  limit: number;
  offset: number;
}

interface Booking {
  id: string;
  court_name: string;
  venue_name: string;
  venue_location: string;
  user_name: string;
  date: string;
  start_time: string;
  end_time: string;
  duration: string;
  total_amount: number;
  status: string;
  notes: string;
  created_at: string;
  updated_at: string;
  cancelled_at?: string;
  payment?: Payment;
}

interface Payment {
  id: string;
  amount: number;
  status: string;
  payment_method: string;
  transaction_id: string;
  created_at: string;
  updated_at: string;
}

export type IGetBookings = {};

const getBookings = async (props?: IGetBookings) => {
  try {
    const res = await axiosAPIWithoutAuth.get<RootObject>(`/bookings`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default getBookings;
