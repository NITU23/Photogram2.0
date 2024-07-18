import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { fetchCoins } from '../redux/cryptoSlice';
import '../css/file.css'; // Import your CSS file

const CryptoTable: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState('SOL'); // Initialize with default value
  const cryptoData = useSelector((state: RootState) => state.crypto.coins);

  useEffect(() => {
    dispatch(fetchCoins(selectedCode));
    const interval = setInterval(() => {
      dispatch(fetchCoins(selectedCode));
    }, 5000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const handleCodeChange = () => {
    setIsModalOpen(false);
    // Logic to handle selectedCode update if needed
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Rate</th>
            <th>Volume</th>
            <th>Cap</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((coin) => (
            <tr key={coin.code}>
              <td>{coin.code}</td>
              <td>{coin.rate}</td>
              <td>{coin.volume}</td>
              <td>{coin.cap}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className='changeButton' onClick={() => setIsModalOpen(true)}>Change Stock/Crypto</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <select
              value={selectedCode}
              onChange={(e) => setSelectedCode(e.target.value)}
            >
              {cryptoData.map((coin) => (
                <option key={coin.code} value={coin.code}>
                  {coin.code}
                </option>
              ))}
            </select>
            <button onClick={handleCodeChange}>Update Code</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoTable;
