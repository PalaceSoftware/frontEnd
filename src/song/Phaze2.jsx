import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../song/phaze2/phaze2_base.css'
import '../song/phaze2/phaze2_img.css'
import '../song/phaze2/phaze2_explain.css'

export default function Phaze2() {

  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [imgsVisible, setImgsVisible] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [explainVisible, setExplainVisible] = useState([false, false, false, false]);
  const [animationOn, setAnimationOn] = useState(false);
  const [birdsVisible, setBirdsVisible] = useState([true, false, false, false, false]);
  const [scrollTimeout, setScrollTimeout] = useState(null);  // 스크롤 완료 감지 타이머
  const [fogOffset, setFogOffset] = useState(0); // fog 이미지의 이동값
  const [rightPalaceZoomed, setRightPalaceZoomed] = useState(false); // right-palace 확대 상태

  const navigate = useNavigate(); // For page navigation

  useEffect(() => {
    setTimeout(() => {
      setBackgroundVisible(true);
    }, 1000);

    setTimeout(() => {
      setImgsVisible(true);
    }, 2000);
    const handleWheel = (e) => {

      e.preventDefault();
      const delta = e.deltaY;

      setFogOffset((prevOffset) => {
        const newOffset = prevOffset + delta * 0.5;
        if (newOffset < 0) return 0; // fog가 0보다 작아지지 않도록 제한
        if (newOffset > 9000) return 9000;
        return newOffset;
      });

      setScrollPosition((prevScrollPosition) => {
        // 스크롤 위치를 업데이트하면서 반대 방향 이동을 허용
        const newScrollPosition = prevScrollPosition + delta;
        if (newScrollPosition <= 0) return 0;
        return newScrollPosition;
      });

      // 스크롤 완료 감지
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);  // 이전 스크롤 감지 타이머 제거
      }

      // 스크롤 완료 후 상태 업데이트
      const newTimeout = setTimeout(() => {
        const updatedBirds = [...birdsVisible];

        // 아래로 스크롤 (새가 순차적으로 나타남)
        if (delta > 0 && !birdsVisible[4]) {
          for (let i = 0; i < updatedBirds.length - 1; i++) {
            if (updatedBirds[i]) {
              updatedBirds[i] = false;   // 현재 보이는 새는 숨기고
              updatedBirds[i + 1] = true; // 다음 새를 표시
              break;
            }
          }
        }
        // 위로 스크롤 (새가 순차적으로 사라짐)
        else if (delta < 0 && !birdsVisible[0]) {
          for (let i = updatedBirds.length - 1; i > 0; i--) {
            if (updatedBirds[i]) {
              updatedBirds[i] = false;   // 현재 보이는 새는 숨기고
              updatedBirds[i - 1] = true; // 이전 새를 표시
              break;
            }
          }
        }

        setBirdsVisible(updatedBirds); // 상태 업데이트

      }, 50);  // 스크롤이 멈춘 후 100ms 대기
      setScrollTimeout(newTimeout);

      // 스크롤이 500에 도달하면 zeolite와 explain 이미지들 애니메이션 실행
      if (birdsVisible[2] && !animationOn && scrollPosition > 0) {
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

      if (!animationOn && explainVisible.every(v => v === true) && fogOffset >= 9000) {
        setRightPalaceZoomed(true); // right-palace 확대
        setTimeout(() => {
          navigate("/phaze3"); // Redirect to another page after zoom
        }, 3500);
      }

    };

    window.addEventListener("wheel", handleWheel);

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };

  }, [scrollPosition, backgroundVisible, imgsVisible, fogOffset, rightPalaceZoomed]);

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
      <audio ref={musicRef} src={process.env.PUBLIC_URL + '/music/start2-music.mp3'} loop />
      <div className="second-page">
        <div className={`content ${rightPalaceZoomed ? 'zoom-view' : ''}`}>
          <img src="images/song/phaze2/background2_1.png" alt='Base' />
          <div className={`background2_1 ${backgroundVisible ? 'visible2' : ''}`}>
            <img src="images/song/phaze2/background2_2.png" alt='Background' />
          </div>

          <img src="images/song/phaze2/land2.png" className={`land2 ${imgsVisible ? 'visible2' : ''}`} />
          <img src="images/song/phaze2/palace2.png" className={`palace2 ${imgsVisible ? 'visible2' : ''}`} />
          <img src="images/song/phaze2/fog2_1.png" className={`fog2_1 ${imgsVisible ? 'visible2' : ''}`}
            style={{ transform: `translateX(${fogOffset * 0.2}px)` }} // 왼쪽으로 이동
          />
          <img src="images/song/phaze2/fog2_2.png" className={`fog2_2 ${imgsVisible ? 'visible2' : ''}`}
            style={{ transform: `translateX(${-fogOffset * 0.2}px)` }} // 왼쪽으로 이동
          />
          <img src="images/song/phaze2/water2.png" className={`water2 ${imgsVisible ? 'visible2' : ''}`} />

          <img src="images/song/phaze2/explain2_1.png" className={`explain2_1 ${explainVisible[0] ? 'slideIn2_1' : ''}`} />
          <img src="images/song/phaze2/explain2_2.png" className={`explain2_2 ${explainVisible[1] ? 'slideIn2_2' : ''}`} />
          <img src="images/song/phaze2/explain2_3.png" className={`explain2_3 ${explainVisible[2] ? 'slideIn2_2' : ''}`} />
          <img src="images/song/phaze2/explain2_4.png" className={`explain2_4 ${explainVisible[3] ? 'slideIn2_2' : ''}`} />

          <img src="images/song/phaze2/birds/birds2_1.png" className={`birds2_1 ${birdsVisible[4] ? 'visible2' : ''}`} />
          <img src="images/song/phaze2/birds/birds2_2.png" className={`birds2_2 ${birdsVisible[3] ? 'visible2' : ''}`} />
          <img src="images/song/phaze2/birds/birds2_3.png" className={`birds2_3 ${birdsVisible[2] ? 'visible2' : ''}`} />
          <img src="images/song/phaze2/birds/birds2_1.png" className={`birds2_4 ${birdsVisible[1] ? 'visible2' : ''}`} />
          <img src="images/song/phaze2/birds/birds2_2.png" className={`birds2_5 ${imgsVisible && birdsVisible[0] ? 'visible2' : ''}`} />



        </div>
      </div>
    </div>
  );
}