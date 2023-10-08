import axios from 'axios';
import {useState} from 'react';

const useSaveJob = () => {
  const [loadingSaveJob, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const saveJob = async (userId, jobId, userType) => {
    setLoading(true); // Set loading to true when starting to fetch
    setError(null); // Reset error before new API call
    try {
      // Define the API endpoint
      const url = 'https://ill-pear-basket-clam-tie.cyclic.cloud/save-job';

      // Define the request body
      const body = {
        userId,
        jobId,
        userType,
      };

      // Define the headers
      const headers = {
        'Content-Type': 'application/json',
      };

      // Make the POST request and await the response
      const response = await axios.post(url, body, {headers});

      // Set the fetched data to state

      setData(response.data);
    } catch (error) {
      // Set an error message to state
      setError(error);
      console.error('Error saving job:', error);
    } finally {
      // Reset loading status once fetching is complete
      setLoading(false);
    }
  };

  return {saveJob, loadingSaveJob, error, data};
};

export default useSaveJob;
