import _ from "lodash";
import { axiosAPI } from "utils/axios";

interface RootObject {
  name: string;
  description: string;
  price_per_hour: number;
}

export type LoginProps = {
  venue_id: string;
  password: string;
};

const addCourt = async (props: LoginProps) => {
  try {
    const res = await axiosAPI.post<RootObject>(
      `/venues/${props.venue_id}/courts`,
      props,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default addCourt;
