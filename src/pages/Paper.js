import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import './Paper.scss';

const useTest = () => {
  const element = useRef();
  useEffect(() => {
    const { current } = element;
    if (current) {
      current.addEventListener('keypress', handleKeypress);
    }
    return () => {
      current.removeEventListener('keypress', handleKeypress);
    };
  }, []);
  return element;
};

const handleKeypress = event => {
  const { value } = event.target;
  if (value.length > 10) {
    event.target.value = value.substring(0, 10);
    alert('글자 수 초과');
    return -1;
  }
};

const Paper = () => {
  const textInput = useTest();
  return (
    <div className="paper">
      <div className="note">
        <img
          className="note__image"
          src="https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/paper.jpg"
          alt=""
        />
        <textarea
          ref={textInput}
          className="note__textarea"
          placeholder="감정을 분출하세요."
        ></textarea>
        <span></span>
      </div>
      <div className="move-button">
        <Link to="/">
          <button className="move-button__previous">prev</button>
        </Link>
        <Link to="/2">
          <button className="move-button__next">next</button>
        </Link>
      </div>
    </div>
  );
};

export default Paper;
