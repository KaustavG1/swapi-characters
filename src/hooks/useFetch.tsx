import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function useFetch<Type>(url: string) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<Type | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchData = useCallback(async (url: string) => {
    try {
      const resp = await axios.get(url);
      const data = await resp?.data;

      setData(data);
      setLoading(false);
    } catch (err) {
      setError(err as AxiosError);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    fetchData(url);
  }, [url]);

  return { isLoading, data, error, fetchData };
}

export default useFetch;
