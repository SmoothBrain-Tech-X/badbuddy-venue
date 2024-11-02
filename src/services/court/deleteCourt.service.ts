import _ from "lodash";
import { axiosAPIWithoutAuth } from "utils/axios";

export type IDeleteCourt = {
  venue_id: string;
  court_id: string;
  password: string;
};

const deleteCourt = async (props: IDeleteCourt) => {
  try {
    const res = await axiosAPIWithoutAuth.put<object>(
      `/venues/${props.venue_id}/courts/${props.court_id}`,
      props,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export default deleteCourt;
