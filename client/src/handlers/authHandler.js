import axios from "axios";
import { url } from "./networks";

// Ensure cookies are sent with requests becuase the server not accepting the cookies from diff host
// port number is changed :)
axios.defaults.withCredentials = true;

axios.defaults.headers.get["Cache-Control"] = "no-cache";
axios.defaults.headers.get["Pragma"] = "no-cache";
axios.defaults.headers.get["Expires"] = "0";

export const login = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${url}/users/login`,
      data: data,
    });
    return res;
  } catch (err) {
    throw err.response.data;
  }
};

export const isLoggedIn = async () => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/users`,
    });
    return res;
  } catch (err) {
    return err.response.data;
  }
};

export const signup = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${url}/users/signup`,
      data,
    });
    return res;
  } catch (err) {
    throw err.response.data;
  }
};
