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

export const getServicesForBooking = async (id) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/bookings/${id}`,
    });
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const getBookedSlots = async (id, date) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/bookings/unavailable-bookings/${id}?date=${date}`,
    });
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const bookSlot = async (data) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${url}/bookings`,
      data,
    });
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const searchHandler = async (query) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/services?name=${query}`,
    });
    return res;
  } catch (err) {
    throw err.response;
  }
};

export const discover = async (query, range) => {
  try {
    const res = await axios({
      method: "GET",
      url: `${url}/services?coord=${query}&range=${range}`,
    });
    return res;
  } catch (err) {
    throw err.response;
  }
};
