import axios from "axios";
import { url } from "./networks";
axios.defaults.withCredentials = true;

axios.defaults.headers.get["Cache-Control"] = "no-cache";
axios.defaults.headers.get["Pragma"] = "no-cache";
axios.defaults.headers.get["Expires"] = "0";

export const getAllServices = async (query) => {
  console.log(query);
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/services?${query ? query : ""}`,
    });
    console.log(res);
    return res;
  } catch (err) {
    return err.response.data;
  }
};
