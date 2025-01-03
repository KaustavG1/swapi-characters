import axios from "axios";

const fetchDataFromUrl = async (url: string) => {
  let data = null;
  let error = null;
  let loading = true;

  try {
    const resp = await axios.get(url);
    data = await resp?.data;
  } catch (err) {
    error = err;
  } finally {
    loading = false;
  }

  return { loading, data, error };
};

export default fetchDataFromUrl;
