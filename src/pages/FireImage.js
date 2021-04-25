import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ImageBox from '../components/ImageBox';

import './FireImage.scss';

const FireImage = props => {
  const [state] = useState(props.location.state);
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      props.history.push('/');
      return -1;
    });
    return () => {
      window.removeEventListener('beforeunload', () => {
        props.history.push('/');
        return -1;
      });
    };
  }, []);
  if (!state) {
    // eslint-disable-next-line no-alert
    alert('홈으로 이동합니다.');
    props.history.push('/');
    return -1;
  }

  return (
    <div className="fireimage">
      {state.files ? <ImageBox files={state.files} /> : null}
      <audio
        src="https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/fire.mp3"
        autoPlay
        loop
      ></audio>
      <div className="flame"></div>
      <Link to="/">
        <i class="fas fa-home"></i>
      </Link>
    </div>
  );
};

export default FireImage;
