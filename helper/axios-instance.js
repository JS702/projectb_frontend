import axios from "axios";
import routes from "../common/routes";

const checkHeaders = () => {
  return localStorage.getItem("jwt")
    ? {
        Authorization: "Bearer " + localStorage.getItem("User").jwt,
      }
    : null;
};

export default axios.create({
  baseURL: routes.baseApiPath,
  headers: checkHeaders,
});
