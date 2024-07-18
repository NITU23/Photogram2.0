import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { fetchCryptoData } from '../redux/cryptoSlice';

const CryptoTable: React.FC = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state: RootState) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Crypto Data</h2>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <strong>{item.code}</strong> - Rate: {item.rate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoTable;
