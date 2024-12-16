import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

function useFetchAll(urls: string[]) {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    if (Array.isArray(urls) && urls?.length > 0) {
      setLoading(true);
      const fetchAllData = async () => {
        try {
          const promiseList = urls?.map((url: string) => axios.get(url));
          const resp = await Promise.all(promiseList);
          const data = await Promise.all(resp?.map((el: any) => el?.data));
          setData(data);
          setLoading(false);
        } catch (err) {
          setError(err as AxiosError);
          setLoading(false);
        }
      };

      fetchAllData();
    }
  }, [urls]);

  return { isLoading, data, error };
}

export default useFetchAll;
