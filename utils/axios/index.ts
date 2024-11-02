import axios from "axios";
import { getSession } from "next-auth/react";

const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_API;
};

const axiosAPI = axios.create({
  baseURL: getBaseUrl(),
});

axiosAPI.interceptors.request.use(async (request) => {
  const session = await getSession();
  if (session) {
    request.headers["X-Authorization"] = `Bearer ${session.user.access_token}`;
  }
  return request;
});

export { axiosAPI, getBaseUrl };
