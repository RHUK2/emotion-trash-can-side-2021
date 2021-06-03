import React, { useState } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';

import './App.scss';

import Home from './pages/Home';
import Paper from './pages/Paper';
import PaperImage from './pages/PaperImage';
import ReadPaper from './pages/ReadPaper';
import Loading from './components/Loading';
import FireImage from './pages/FireImage';

const backgroundImages = [
  'https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/sky1.jpg',
  'https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/sky2.jpg',
  'https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/sky3.jpg',
  'https://emotion-trash-can-2021-side.s3.ap-northeast-2.amazonaws.com/assets/sky4.jpg'
];

const useRandomArrayData = array => {
  const randomIndex = Math.floor(Math.random() * array.length);
  const data = array[randomIndex];
  return data;
};

function App() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, 700);
  const backgroundImage = useRandomArrayData(backgroundImages);
  return (
    <>
      <Loading />
      <img className="background-image" src={backgroundImage} alt="" />
      {loading ? null : (
        <Router>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/1" component={Paper}></Route>
            <Route path="/2" component={PaperImage}></Route>
            <Route path="/3" component={ReadPaper}></Route>
            <Route path="/4" component={FireImage}></Route>
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
