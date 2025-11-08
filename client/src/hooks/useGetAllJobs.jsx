import { setAlljobs } from '@/redux/jobSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';
import { JOB_API_END_POINT } from '@/utils/constant';

export const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const fetchAllJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setAlljobs(res.data.jobs));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  return { fetchAllJobs, loading }; // return useful data / functions
};
