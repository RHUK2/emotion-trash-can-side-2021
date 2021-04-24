import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import './ReadPaper.scss';

const useVolume = () => {
  const audio = useRef();
  const button = useRef();

  const handleClick = event => {
    if (!audio.current.muted) {
      audio.current.muted = true;
      event.target.classList.replace('fa-volume-up', 'fa-volume-mute');
    } else {
      audio.current.muted = false;
      event.target.classList.replace('fa-volume-mute', 'fa-volume-up');
    }
  };

  useEffect(() => {
    const target = button.current;
    if (target) {
      target.addEventListener('click', handleClick);
    }
    return () => {
      if (target) {
        target.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return [audio, button];
};

const ReadPaper = props => {
  const [state] = useState(props.location.state);
  const [audio, button] = useVolume();
  if (state === undefined) {
    // eslint-disable-next-line no-alert
    alert('잘못된 접근입니다.');
    props.history.push('/');
    return -1;
  }

  return (
    <div className="readpaper">
      <div className="readpaper__content">
        <p className="readpaper__text">
          {state.dataTo} 에게..
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          {state.text}
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          {state.dataFrom} (으)로부터..
        </p>
      </div>
      <div className="readpaper__icon">
        <audio
          ref={audio}
          src="https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/starlight-island.wav"
          autoPlay
          loop
        ></audio>
        <i ref={button} className="fas fa-volume-up"></i>
        <Link
          to={{
            pathname: '/4',
            state: {
              files: state.file
            }
          }}
        >
          <i className="fas fa-burn"></i>
        </Link>
      </div>
    </div>
  );
};

export default ReadPaper;
