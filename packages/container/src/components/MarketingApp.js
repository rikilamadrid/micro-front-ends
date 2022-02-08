import React, { useRef, useEffect }from 'react';
import { mount } from 'marketing/MarketingApp';

export default function MarketingApp() {
  const ref = useRef(null);

  // This useEffect can be use to show or hide apps for example depending on authorization status.
  useEffect(() => {
    mount(ref.current);
  }); // Doing this approach helps us be framework agnostic in the consuption of microfrontends. Developer needs to export app with a mount function.

  return <div ref={ref}></div>;
};
