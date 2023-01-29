import useSWR from 'swr';
import { MetricAverages } from '../models/MetricAverages';

export const useAverages = (): { data?: MetricAverages; loading: boolean; error: unknown } => {

  const { data, error } = useSWR(
    `/api/metric/averages`,
    async (path: string) => {
      const response = await fetch(path);

      if (!response.ok) {
        const error = new Error('An error occurred while fetching the data.');
        error.stack = await response.json();
        throw error;
      }

      const { data } = await response.json();
      return data;
    },
  );

  return {
    data,
    loading: !error && !data,
    error: error,
  };
};
