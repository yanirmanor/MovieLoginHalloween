import axios from "axios";

export const serviceApi = axios.create({
  baseURL: `https://freddy.codesubmit.io/`,
});
