import axios from "axios";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_API;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
const axiosAPI = axios.create({
  baseURL: getBaseUrl(),
});

export { axiosAPI, getBaseUrl };
