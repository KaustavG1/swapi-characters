import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function useFetchAll<Type>(urls: string[]) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<Type | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const fetchAllData = useCallback(async (urls: string[]) => {
    try {
      const promiseList = urls?.map((url: string) => axios.get(url));
      const resp = await Promise.all(promiseList);
      const data = await Promise.all(resp?.map((el: any) => el?.data));
      setData(data as Type);
    } catch (err) {
      setError(err as AxiosError);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(urls) && urls?.length > 0) {
      setLoading(true);

      fetchAllData(urls);
    } else {
      setLoading(false);
    }
  }, [urls]);

  return { isLoading, data, error };
}

export default useFetchAll;
