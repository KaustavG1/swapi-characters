import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function useFetch(url: string) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios.get(url);
        const data = await resp?.data;

        setData(data);
        setLoading(false);
      } catch (err) {
        setError(err as AxiosError);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { isLoading, data, error };
}

export default useFetch;
