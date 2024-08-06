import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Components/Code/First/Home';
import Login from './Components/Code/First/Login';
import SignUp from './Components/Code/First/SignUp';
import HealthInfo1 from './Components/Code/First/HealthInfo1';
import Recommend from './Components/Code/Second/Recommend';
import Lunch from './Components/Code/Second/Lunch';
import LunchBox from './Components/Code/Second/LunchBox';
import Like from './Components/Code/Second/Like';
import MyPage from './Components/Code/Second/MyPage';
import HealthCheck from './Components/Code/Second/HealthCheck';
import LunchCheck from './Components/Code/Second/LunchCheck';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/healthinfo1" element={<HealthInfo1 />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/lunchbox/:lunchbox_id" element={<LunchBox />} />
          <Route path="/like" element={<Like />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/healthcheck" element={<HealthCheck />} />
          <Route path="/lunchcheck" element={<LunchCheck />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
