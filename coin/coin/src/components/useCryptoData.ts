import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { updateCryptoData } from '../redux/cryptoSlice';

const useCryptoData = (code: string) => {
  const dispatch = useDispatch();
  const cryptoData = useSelector((state: RootState) => state);

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await fetch(`http://localhost:500`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        dispatch(updateCryptoData(data)); // Assuming data is an array
      } catch (error) {
        console.error('Failed to fetch crypto data:', error);
      }
    };

    fetchCryptoData(); // Initial fetch

    const interval = setInterval(() => {
      fetchCryptoData();
    }, 5000); // Fetch new data every 5 seconds

    return () => clearInterval(interval);
  }, [code, dispatch]);

  return cryptoData;
};

export default useCryptoData;
