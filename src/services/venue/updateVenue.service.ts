import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type TUpdateVenue = {
  name: string;
  description: string;
  address: string;
  location: string;
  phone: string;
  email: string;
  open_time: string;
  close_time: string;
  image_urls: string;
  status: string;
};

const updateVenue = async (props: TUpdateVenue) => {
  try {
    const res = await axiosAPIWithoutAuth.put<object>(`/venues`, props);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default updateVenue;
