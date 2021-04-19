import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import './Home.scss';

const backgroundImages = [
  'https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/sky1.jpg',
  'https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/sky2.jpg',
  'https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/sky3.jpg',
  'https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/sky4.jpg'
];

const useRandomBackgroundImage = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const [backgroundImage, setBackgroundImage] = useState({
    url: null,
    loading: true
  });
  useEffect(() => {
    setTimeout(() => {
      setBackgroundImage({
        url: array[randomIndex],
        loading: false
      });
    }, 1000);
  }, []);
  return { ...backgroundImage };
};

const Home = () => {
  const { url, loading } = useRandomBackgroundImage(backgroundImages);
  return (
    <div className="home">
      {loading ? (
        <Loading />
      ) : (
        <>
          <img className="home__background-image" src={url} alt="" />
          <h4 className="home__message">많이 힘들었지?</h4>
          <h4 className="home__message2">속 썩이던 감정 여기에 두고 가.</h4>
          <button className="home__button">시작하기</button>
        </>
      )}
    </div>
  );
};

export default Home;
