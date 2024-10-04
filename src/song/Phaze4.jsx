import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import '../song/phaze4/phaze4_base.css'
import '../song/phaze4/phaze4_img.css'
import '../song/phaze4/phaze4_explain.css'

export default function Phaze4() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [imgsVisible, setImgsVisible] = useState(false);

  const [explainVisible, setExplainVisible] = useState([false, false, false, false, false]); // 각 explain이 보일 상태
  const [changeBackground, setChangeBackground] = useState(false);

  const navigate = useNavigate(); // For page navigation

  useEffect(() => {

    setTimeout(() => {
      setBackgroundVisible(true);
    }, 1000);

    setTimeout(() => {
      setImgsVisible(true);
    }, 2000);

    const handleScroll = (e) => {

      e.preventDefault();

      const delta = e.deltaY;

      setScrollPosition((prevScrollPosition) => {
        // 스크롤 위치를 업데이트하면서 반대 방향 이동을 허용
        const newScrollPosition = prevScrollPosition + delta;
        if (newScrollPosition <= 0) return 0;
        return newScrollPosition;
      });

      // 스크롤이 500에 도달하면 zeolite와 explain 이미지들 애니메이션 실행
      if (scrollPosition > 0) {
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            setExplainVisible((prevState) => {
              const newVisible = [...prevState];
              newVisible[i] = true;
              return newVisible;
            });
          }, i * 500);

          setTimeout(() => {
            setChangeBackground(true);
            setTimeout(() => {
              navigate("/phaze5"); // Redirect to another page after zoom
            }, 2000);
          }, 15000);
        }
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });


    return () => {
      window.removeEventListener("wheel", handleScroll);

    };
  }, [scrollPosition, explainVisible, changeBackground]);

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
      <div className={'fourth-page'}>
        <div className={'content4'}>
          <img src="/images/song/phaze4/background4.png" alt='background'
            className={`background4_1 ${backgroundVisible ? 'visible4_1' : ''}`} />

          <img src="/images/song/phaze4/palace4.png" className={`palace4 ${imgsVisible ? 'visible4_2' : ''}`} />
          <img src="/images/song/phaze4/fog4_1.png" className={`fog4_1 ${imgsVisible ? 'visible4_2' : ''}`} />
          <img src="/images/song/phaze4/fog4_2.png" className={`fog4_2 ${imgsVisible ? 'visible4_2' : ''}`} />
          <img src="/images/song/phaze4/land4.png" className={`land4 ${imgsVisible ? 'visible4_2' : ''}`} />
          <img src="/images/song/phaze4/wall4.png" className={`wall4 ${imgsVisible ? 'visible4_2' : ''}`} />


          <img src="/images/song/phaze4/explain4_1.png" className={`explain4_1 ${explainVisible[0] ? 'slideIn4' : ''}`} />
          <img src="/images/song/phaze4/explain4_2.png" className={`explain4_2 ${explainVisible[1] ? 'slideIn4' : ''}`} />
          <img src="/images/song/phaze4/explain4_3.png" className={`explain4_3 ${explainVisible[2] ? 'slideIn4' : ''}`} />
          <img src="/images/song/phaze4/explain4_4.png" className={`explain4_4 ${explainVisible[3] ? 'slideIn4' : ''}`} />
          <img src="/images/song/phaze4/explain4_5.png" className={`explain4_5 ${explainVisible[4] ? 'slideIn4' : ''}`} />

          <img src="/images/song/phaze5/background5.png" className={`background4_2 ${changeBackground ? 'visible4_1' : ''}`} />

        </div>
      </div>
    </div>
  );
}