import { useState, useRef, useEffect } from "react";

const baseUrl = process.env.REACT_APP_API_BASE_URL;

// Custom hook. A Javascript function with a few extra rules.
export default function useFetch(url) {
  // Use to Ref to determine if the component has mounted.
  // Think of this as an instance variable. React persists ref values between renders.
  // GOAL: Only set state if the component is mounted.
  const isMounted = useRef(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Any function returned from useEffect is called on unmount.
    isMounted.current = true;
    async function init() {
      try {
        const response = await fetch(baseUrl + url);
        if (response.ok) {
          const json = await response.json();
          if (isMounted.current) setData(json);
        } else {
          throw response;
        }
      } catch (e) {
        if (isMounted.current) setError(e);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    }
    init();
    // Any function returned from useEffect is called on unmount.
    // This function will be called when the component unmounts. 
    return () => {
      isMounted.current = false;
    };
  }, [url]);

  return { data, error, loading };
}

export function Fetch({ url, children }) {
  const { data, loading, error } = useFetch(url);
  return children(data, loading, error);
}
