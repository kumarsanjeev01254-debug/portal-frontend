import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { APPLICATION_API_ENDPOINT } from "@/utilis/data";
import { setAllAppliedJobs } from "@/redux/JobSlice";

const UseGetAppliedJobs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `${APPLICATION_API_ENDPOINT}/get`,
          {
            withCredentials: true,
          }
        );

        console.log("APPLIED JOBS RESPONSE:", response.data);

        dispatch(
          setAllAppliedJobs(response.data.applications || [])
        );
      } catch (error) {
        console.error(
          "Error fetching applied jobs:",
          error.response?.data || error.message
        );
      }
    };

    fetchAppliedJobs();
  }, [dispatch]);

  return null;
};

export default UseGetAppliedJobs;