import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, ErrorBoundary } from '@rollbar/react';
import './index.css';
import init from './init';

const startApp = async () => {
  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_ACCESS_TOKEN,
    environment: 'testenv',
  };

  const initialization = await init();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider config={rollbarConfig}>
        <ErrorBoundary>
          {initialization}
        </ErrorBoundary>
      </Provider>
    </React.StrictMode>,
  );
};
startApp();
