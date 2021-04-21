import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';

import Home from './pages/Home';
import Paper from './pages/Paper';
import Loading from './components/Loading';

const backgroundImages = [
  'https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/sky1.jpg',
  'https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/sky2.jpg',
  'https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/sky3.jpg',
  'https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/sky4.jpg'
];

const useRandomBackgroundImage = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const [backgroundImage] = useState(array[randomIndex]);
  return backgroundImage;
};

function App() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 700);
  const backgroundImage = useRandomBackgroundImage(backgroundImages);
  return (
    <>
      <Loading />
      <img className="background-image" src={backgroundImage} alt="" />
      {loading ? null : (
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/1" component={Paper}></Route>
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
