import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import '../song/phaze6/phaze6_base.css'
import '../song/phaze6/phaze6_img.css'
import '../song/phaze6/phaze6_explain.css'

export default function Phaze6() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [imgsVisible, setImgsVisible] = useState(false);
  const [explainVisible, setExplainVisible] = useState([false, false, false, false]); // 각 explain이 보일 상태
  const [animationOn, setAnimationOn] = useState(false);
  const [changeBackground, setChangeBackground] = useState(false);
  const [changeImgs, setChangeImgs] = useState(false);

  const [fogOffset, setFogOffset] = useState(0); // fog 이미지의 이동값
  const [fogOff, setFogOff] = useState(false); // fog 이미지의 이동값
  const [fogOpacity, setFogOpacity] = useState(false); // fog 이미지의 이동값

  const [finalBackground, setFinalBackground] = useState(false); // fog 이미지의 이동값

  const navigate = useNavigate(); // For page navigation

  useEffect(() => {
    setTimeout(() => {
      setImgsVisible(true);
    }, 1000);
    const handleScroll = (e) => {

      e.preventDefault();
      const delta = e.deltaY;

      if (animationOn) return;

      setScrollPosition((prevScrollPosition) => {
        // 스크롤 위치를 업데이트하면서 반대 방향 이동을 허용
        const newScrollPosition = prevScrollPosition + delta;
        if (newScrollPosition <= 0) return 0;
        return newScrollPosition;
      });

      if (changeBackground) {
        setFogOffset((prevOffset) => {
          const newOffset = prevOffset + delta * 0.5;
          if (newOffset < 0) return 0; // fog가 0보다 작아지지 않도록 제한
          else if ((newOffset * 0.2) >= 1950) return 9752; // fog가 0보다 작아지지 않도록 제한
          return newOffset;
        });

        setFogOpacity((prev) => {
          const newOpacity = Math.min(Math.max(prev + delta * 0.00005, 0), 1); // 0과 1 사이로 제한
          const newMove = prev + delta * 0.01; // 스크롤에 따라 이동

          if (newMove <= 0) return 0;
          if (newMove >= 1950) return 1;

          return newOpacity;
        });
      }

      // 스크롤이 500에 도달하면 zeolite와 explain 이미지들 애니메이션 실행
      if (!changeBackground && scrollPosition > 0 && !fogOff) {
        setAnimationOn(true);
        for (let i = 0; i < 4; i++) {
          setTimeout(() => {
            setExplainVisible((prevState) => {
              const newVisible = [...prevState];
              newVisible[i] = true;
              return newVisible;

            });
          }, i * 500);
        }
        setTimeout(() => setAnimationOn(false), 2000); // 2초 후 애니메이션 상태 해제
      }

      if (!changeBackground && scrollPosition > 0 && explainVisible.every(v => v === true) && !fogOff) {
        setAnimationOn(true);
        setChangeBackground(true);
        setFogOpacity(0);
        setTimeout(() => {
          setAnimationOn(false);
        }, 3000); // 2초 후 애니메이션 상태 해제
      }

      if (changeBackground && fogOffset >= 9750) {
        setAnimationOn(true);
        setChangeImgs(true);
        setChangeBackground(false);
        setExplainVisible([false, false, false, false]);
        setTimeout(() => setFogOff(true), 2000); // 2초 후 애니메이션 상태 해제
        setTimeout(() => setAnimationOn(false), 3000); // 2초 후 애니메이션 상태 해제
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [scrollPosition, explainVisible, animationOn, changeBackground, changeImgs]);

  // 클릭 이벤트 핸들러 추가
  const handleCursorClick = () => {
    setFinalBackground(true);
    setTimeout(() => {
      navigate("/phaze7"); // Redirect to another page after zoom
    }, 2000);
  };

  const musicRef = useRef(null);

  useEffect(() => {
    const music = musicRef.current;

    if (music) {
      // 음소거 상태에서 음악을 자동 재생
      music.muted = true;
      music.play().then(() => {
        // 재생이 시작된 후 짧은 지연 시간 후 음소거 해제
        setTimeout(() => {
          music.muted = false;
        }, 1000);
      }).catch((error) => {
        console.log('Autoplay was prevented:', error);
      });
    }

    return () => {
      if (music) {
        music.pause();
      }
    };
  }, []);

  return (
    <div>
      <audio ref={musicRef} src={process.env.PUBLIC_URL + '/music/map-music.mp3'} loop />
      <div className={'sixth-page'}>
        <div className={'content6'}>
          <img src="/images/song/phaze6/background6_1.png" alt='background'
            className="background6_1" />
          <img src="/images/song/phaze6/background6_2.png" alt='background'
            className={`background6_2 ${changeBackground ? 'visible6' : ''}`} />

          <img src="/images/song/phaze6/palace6_1.png" className={`palace6_1 ${(imgsVisible && !changeImgs) ? 'visible6' : (imgsVisible && changeImgs) ? 'hidden6' : ''}`} />
          <img src="/images/song/phaze6/palace6_2.png"
            className={`palace6_2 ${changeBackground ? 'visible6' : (changeImgs && fogOff) ? 'hidden6' : ''}`} />
          <img src="/images/song/phaze6/palace6_3.png"
            className={`palace6_3 ${changeImgs ? 'visible6' : ''}`} />


          <img src="/images/song/phaze6/explain6_1.png" className={`explain6_1 ${explainVisible[0] && !changeImgs ? 'slideIn6_2' : changeImgs ? 'hidden6' : ''}`} />
          <img src="/images/song/phaze6/explain6_2.png" className={`explain6_2 ${explainVisible[1] && !changeImgs ? 'slideIn6_1' : changeImgs ? 'hidden6' : ''}`} />
          <img src="/images/song/phaze6/explain6_3.png" className={`explain6_3 ${explainVisible[2] && !changeImgs ? 'slideIn6_1' : changeImgs ? 'hidden6' : ''}`} />
          <img src="/images/song/phaze6/explain6_4.png" className={`explain6_4 ${explainVisible[3] && !changeImgs ? 'slideIn6_1' : changeImgs ? 'hidden6' : ''}`} />

          <img src="/images/song/phaze6/fog6_1.png" className={`fog6_1 ${changeBackground ? 'visible6' : (changeImgs && fogOff) ? 'move_bottom6' : ''}`}
            style={{ transform: `translateX(${fogOffset * 0.2}px)`, opacity: fogOpacity }} />
          <img src="/images/song/phaze6/fog6_2.png" className={`fog6_2 ${changeBackground ? 'visible6' : (changeImgs && fogOff) ? 'move_bottom6' : ''}`}
            style={{ transform: `translateX(${-fogOffset * 0.2}px)`, opacity: fogOpacity }} />

          <img src="/images/song/phaze6/cursor/cursor6_1.png" className={`cursor6_1 ${changeImgs ? 'visible6' : ''}`} onClick={handleCursorClick} />
          <img src="/images/song/phaze6/cursor/cursor6_2.png" className={`cursor6_2 ${changeImgs ? 'visible6' : ''}`} onClick={handleCursorClick} />
          <img src="/images/song/phaze6/cursor/cursor6_3.png" className={`cursor6_3 ${changeImgs ? 'visible6' : ''}`} onClick={handleCursorClick} />
          <img src="/images/song/phaze6/cursor/cursor6_4.png" className={`cursor6_4 ${changeImgs ? 'visible6' : ''}`} onClick={handleCursorClick} />
          <img src="/images/song/phaze6/cursor/cursor6_5.png" className={`cursor6_5 ${changeImgs ? 'visible6' : ''}`} onClick={handleCursorClick} />

          <img src="/images/song/phaze6/explain6_5.png" className={`explain6_5 ${changeImgs ? 'slideIn6_1' : ''}`} />
          <img src="/images/song/phaze6/explain6_6.png" className={`explain6_6 ${changeImgs ? 'slideIn6_1' : ''}`} />

          <img src="/images/song/phaze6/background6_3.png" alt='background' className={`background6_3 ${finalBackground ? 'next_page6' : ''}`} />

        </div>
      </div>
    </div>
  );
}