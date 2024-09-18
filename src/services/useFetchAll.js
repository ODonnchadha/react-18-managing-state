import { useState, useEffect, useRef } from "react";

export default function useFetchAll(urls) {
  // Every time the cart renders, the URLs array is created. Infinite loop.
  // We can use a ref to store the previous value passed in.
  const previousUrls = useRef([]);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Two arguments: (1) A function. (2) Specify when it runs. e.g.: An empty array.
  // An empty array states "Run this only once."
  useEffect(() => {
    // Only run if the array of URLs passed in changes.
    // Guard clause: useEffect is run after each and every render.
    if (areEqual(previousUrls.current, urls)) {
      setLoading(false);
      return;
    }

    previousUrls.current = urls;

    const promises = urls.map((url) =>
      fetch(process.env.REACT_APP_API_BASE_URL + url).then((response) => {
        if (response.ok) return response.json();
        throw response;
      })
    );

    Promise.all(promises)
      .then((json) => setData(json))
      .catch((e) => {
        console.error(e);
        setError(e);
      })
      .finally(() => setLoading(false));
  }, [urls]);

  return { data, loading, error };
}

// Simple function for comparing two arrays.
// Ensure that the arrays have the same length and then if every property has the same value.
function areEqual(array1, array2) {
  return (
    array1.length === array2.length &&
    array1.every((value, index) => value === array2[index])
  );
}
