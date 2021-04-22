import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import './Paper.scss';

const useCheckText = (maxLength = 100) => {
  const [textcount, setTextcount] = useState(0);
  const [text, setText] = useState('');
  if (typeof maxLength !== 'number') {
    return;
  }
  const handleCheckText = event => {
    const { value } = event.target;
    setTextcount(value.length);
    setText(value);
    if (value.length > maxLength) {
      event.target.value = value.substring(0, maxLength);
      setTextcount(maxLength);
      alert(`${maxLength}자를 초과하였습니다.`);
      return -1;
    }
  };
  return { textcount, text, handleCheckText };
};

const useInputData = () => {
  const element = useRef();
  const [data, setData] = useState('');
  const getData = event => {
    setData(event.target.value);
  };
  useEffect(() => {
    const target = element.current;
    if (target) {
      target.addEventListener('keyup', getData);
    }
    return () => {
      if (target) {
        target.removeEventListener('keyup', getData);
      }
    };
  }, []);
  return [element, data];
};

const Paper = () => {
  const MAX_LENGTH = 500;
  const { textcount, text, handleCheckText } = useCheckText(MAX_LENGTH);
  const [inputTo, dataTo] = useInputData();
  const [inputFrom, dataFrom] = useInputData();
  return (
    <div className="paper">
      <div className="note">
        <img
          className="note__image"
          src="https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/paper.jpg"
          alt=""
        />
        <input ref={inputTo} className="note__to" placeholder="..."></input>
        <textarea
          onKeyUp={handleCheckText}
          className="note__textarea"
          placeholder="감정을 표출하세요."
        ></textarea>
        <input ref={inputFrom} className="note__from" placeholder="..."></input>
        <span className="note__textcount">
          ({textcount} / {MAX_LENGTH})
        </span>
      </div>
      <div className="move-button">
        <Link to="/">
          <button className="move-button__previous">prev</button>
        </Link>
        <Link
          to={{
            pathname: '/2',
            state: {
              dataTo,
              dataFrom,
              text
            }
          }}
        >
          <button className="move-button__next">next</button>
        </Link>
      </div>
    </div>
  );
};

export default Paper;
