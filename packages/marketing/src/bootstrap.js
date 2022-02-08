import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Mount function to start up the app
const mount = (el) => {
  ReactDOM.render(
    <App />,
    el,
  );
};

// If we are in development mode and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_marketing-dev-root'); // In dev we know the correct id so we can just mount
  if (devRoot) {
    mount(devRoot);
  }
}

// We are running trough container
// and we should export the mount function
export { mount };