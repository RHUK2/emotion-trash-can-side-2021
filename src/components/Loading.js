import React, { useEffect, useRef } from 'react';

import './Loading.scss';

const useDelayHide = () => {
  const element = useRef();
  useEffect(() => {
    const { current } = element;
    if (current) {
      setTimeout(() => {
        current.classList.add('display-none');
      }, 700);
    }
  }, []);
  return element;
};

const Loading = () => {
  const loading = useDelayHide();
  return (
    <div ref={loading} className="loading">
      <div className="loading__circle"></div>
    </div>
  );
};

export default Loading;
