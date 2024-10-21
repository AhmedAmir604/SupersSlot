import axios from "axios";
import { url } from "./networks";
axios.defaults.withCredentials = true;

axios.defaults.headers.get["Cache-Control"] = "no-cache";
axios.defaults.headers.get["Pragma"] = "no-cache";
axios.defaults.headers.get["Expires"] = "0";

export const getAllServices = async (query) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/services?${query ? query : ""}`,
    });
    return res;
  } catch (err) {
    return err.response.data;
  }
};

export const getService = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/services/${id}`,
    });
    return res;
  } catch (err) {
    return err.response.data;
  }
};

export const getSomeServices = async (query) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/services?${query ? query : ""}`,
    });
    return res;
  } catch (err) {
    return err.response.data;
  }
};
