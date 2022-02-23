
import React from 'react';
import ReactDOM from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';
import App from './App';

// Mount function to start up the app
// params: 
//   el: DOM element to mount the app
//   object with options:
//    onNavigate: function to call when the app navigates
//    defaultHistory: history object to use (if on development we create
//    a browser history otherwise we use a memory history).
//    initialPath: path to navigate to initially
// returns:
//   object with callback:
//     onParentNavigate: to communicate with the parent app.
const mount = (el, { onNavigate, defaultHistory, initialPath, onSignIn }) => {
  // If we are on development mode we use browser history otherwise the remote app needs to have a memory history and not a browser history since the host shell app is using that history for the routes and we can avoid any race issue when they both try to update the same history object.
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath]
  });

  if (onNavigate) {
    history.listen(onNavigate);
  };

  ReactDOM.render(
    <App onSignIn={onSignIn} history={history} />,
    el,
  );

  return {
    onParentNavigate({ pathname: nextPathname }) {
      console.log('lamadrid container just navigated', nextPathname);
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development mode and in isolation,
// call mount immediately
if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_auth-dev-root'); // In dev we know the correct id so we can just mount
  if (devRoot) {
    mount(devRoot, { defaultHistory: createBrowserHistory() });
  }
}

// We are running trough container
// and we should export the mount function
export { mount };