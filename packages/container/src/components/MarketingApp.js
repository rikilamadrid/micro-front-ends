import React, { useRef, useEffect } from 'react';
import { mount } from 'marketing/MarketingApp';
import { useHistory } from 'react-router-dom';

export default function MarketingApp() {
  const ref = useRef(null);
  const history = useHistory();

  // This useEffect can be use to show or hide apps for example depending on authorization status.
  useEffect(() => {
    // destructuring the object that function mounts return so we can communicate with the parent app the navigation.
    const { onParentNavigate } = mount(ref.current, {
      initialPath: history.location.pathname,
      // destructuring the pathname out of location object and renaming it to nextPathname
      onNavigate: ({ pathname: nextPathname }, label) => {
        console.log('lamadrid nextPathname', nextPathname);
        console.log('lamadrid label', label.label);
        const { pathname } = history.location;
        // to avoid infinite loop we check if the pathname is the same as the nextPathname
        if (pathname !== nextPathname) {
          // navigate to this new path
          history.push(nextPathname);
        }
      },
    });

    // listens to the history object and call the onParentNavigate function when the history object changes
    history.listen(onParentNavigate);
  }, []); // Doing this approach of the mount function helps us be framework agnostic in the consuption of microfrontends. Developer needs to export app with a mount function and the parameters needed alongside the return object needed.

  return <div ref={ref}></div>;
};
