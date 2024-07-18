
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import CryptoTable from '../components/cryptoTable';
import { useClient   } from 'next/client';
const App: React.FC = () => {
  useClient();
  return (
    <Provider store={store}>
      <div className="App">
        <CryptoTable />
      </div>
    </Provider>
  );
};

export default App;
