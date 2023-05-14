import { useCallback, useState } from "react";


export const useHttp = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const sendRequest = useCallback(async (requestConfig, applyData) => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
            requestConfig.url, {
                method: requestConfig.method ? requestConfig.method : 'GET',
                headers: requestConfig.headers ? requestConfig.headers : {
                    // default empty for 'GET'
                },
                body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
            }
        );
  
        if (!response.ok) {
          throw new Error('Request failed!');
        }
  
        const data = await response.json();
        // send the data up, and the caller of the function will handle it as needed;
        applyData(data);
        
      } catch (err) {
        setError(err.message || 'Something went wrong!');
      }
      setIsLoading(false);
    }, [
        // requestConfig, <- no need to be in dependencies when the inner method accepts it
        // applyData,
    ]);

    return {
        isLoading,
        error,
        sendRequest,
    };

};

