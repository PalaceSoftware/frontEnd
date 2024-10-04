import './App.css';
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";


import Role from "./test/Role";


import Start from "./Start";

import Test2 from "./test/Test2";
import Test3 from "./test/Test3";
import Map from "./map/map";
import Injungjun from './spot/injungjun';
import Nakseonjae from './spot/nakseonjae';
import Buyongji from './spot/buyongji';
import Juniper from './spot/juniper';
import Yunghwadang from './spot/yunghwadang';
import Changhoji from './spot/changhoji';
import Loading from './loading/loading';


import ScrollDownPage from "./Pages_kdh/ScrollDownPage";
import Quiz1 from "./Pages_kdh/Quiz1";
import Quiz2 from "./Pages_kdh/Quiz2";
import Quiz3 from "./Pages_kdh/Quiz3";

import Phaze1 from "./song/Phaze1";
import Phaze2 from "./song/Phaze2";
import Phaze3 from "./song/Phaze3";
import Phaze4 from "./song/Phaze4";
import Phaze5 from "./song/Phaze5";
import Phaze6 from "./song/Phaze6";
import Phaze7 from "./song/Phaze7";


import Layout from './song/cursor/Layout';

function RedirectToPhaze1() {
  const navigate = useNavigate();

  useEffect(() => {
    // '/' 경로에 접근할 때 '/phaze1'로 리디렉션
    navigate('/phaze1');
  }, [navigate]);

  return null;
}

function App() {
  useEffect(() => {
    // 로컬 스토리지의 특정 키 삭제 또는 초기화
    localStorage.removeItem('capturedPages');
  }, []);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/start' element={<Start />} />
          <Route path='/map' element={<Map />} />
          <Route path='/nakseonjae/changhoji' element={<Changhoji />} />
          <Route path='*' element={
            <Layout>
              <Routes>
                <Route path="/" element={<RedirectToPhaze1 />} />
                <Route path='/test2' element={<Test2 />} />
                <Route path='/test3' element={<Test3 />} />
                <Route path='/phaze1' element={<Phaze1 />} />
                <Route path='/phaze2' element={<Phaze2 />} />
                <Route path='/phaze3' element={<Phaze3 />} />
                <Route path='/phaze4' element={<Phaze4 />} />
                <Route path='/phaze5' element={<Phaze5 />} />
                <Route path='/phaze6' element={<Phaze6 />} />
                <Route path='/phaze7' element={<Phaze7 />} />
                <Route path='/loading' element={<Loading />} />
                <Route path='/injungjun' element={<Injungjun />} />
                <Route path='/nakseonjae' element={<Nakseonjae />} />
                <Route path='/buyongji' element={<Buyongji />} />
                <Route path='/yunghwadang' element={<Yunghwadang />} />
                <Route path='/juniper' element={<Juniper />} />
                <Route path='/scrolldownpage' element={<ScrollDownPage />} />
                <Route path='/quiz1' element={<Quiz1 />} />
                <Route path='/quiz2' element={<Quiz2 />} />
                <Route path='/quiz3' element={<Quiz3 />} />

              </Routes></Layout>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;