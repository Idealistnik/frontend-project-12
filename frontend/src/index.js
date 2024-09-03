// /* eslint-disable functional/no-expression-statement */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider, ErrorBoundary } from '@rollbar/react';
import './index.css';
import init from './init';
import reportWebVitals from './reportWebVitals';

const startApp = async () => {
  const rollbarConfig = {
    accessToken: '2a15660f79934906b48e3a9a4777d1dc',
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

reportWebVitals();
