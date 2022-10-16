import axios from "axios";

export const makePostRequest = async (url, dataobj) => {
  const { data } = await axios.post(process.env.NEXT_PUBLIC_API_URL + url, {
    ...dataobj,
  });
  return data;
};
