import React from 'react';
import { Link } from 'react-router-dom';

import './Home.scss';

const Home = () => {
  return (
    <div className="home">
      <h4 className="home__message">많이 힘들었지?</h4>
      <h4 className="home__message2">속 썩이던 감정 여기에 두고 가.</h4>
      <Link to="/1">
        <button className="home__button">시작하기</button>
      </Link>
    </div>
  );
};

export default Home;
