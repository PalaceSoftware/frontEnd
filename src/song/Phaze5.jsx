import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../song/phaze5/phaze5_base.css'
import '../song/phaze5/phaze5_img.css'
import '../song/phaze5/phaze5_explain.css'

export default function Phaze5() {
    const [scrollPosition, setScrollPosition] = useState(0);
    const [imgsVisible, setImgsVisible] = useState(false);
    const [fogVisible, setFogVisible] = useState(false);
    const [animationOn, setAnimationOn] = useState(false);

    const [explainVisible, setExplainVisible] = useState([false, false, false]); // 각 explain이 보일 상태
    const [zeoliteBack, setZeoliteBack] = useState(false); // 비석 뒤로 움직이기 + 작아지기
    const [zeolitesVisible, setZeolitesVisible] = useState(false); // zeolites 이미지 가시성 상태
    const [sinhaScale, setSinhaScale] = useState(1); // sinha의 크기
    const [explainOffset, setExplainOffset] = useState(0);
    const [nextBackground, setNextBackground] = useState(0);

    const navigate = useNavigate(); // For page navigation

    useEffect(() => {

        setTimeout(() => {
            setImgsVisible(true);
        }, 1000);

        const handleScroll = (e) => {
          if (animationOn) return; // 상호작용 차단

          e.preventDefault();
    
          const delta = e.deltaY;

          setScrollPosition((prevScrollPosition) => {
            // 스크롤 위치를 업데이트하면서 반대 방향 이동을 허용
            const newScrollPosition = prevScrollPosition + delta;
            if (newScrollPosition < 0) return 0;

            return newScrollPosition; // -600px 이상으로 이동하지 않도록 제한
          });

          // 스크롤 위치에 따른 안개의 투명도 조정
          if(!fogVisible && scrollPosition <= 1500) {
            const fogOpacity = 1 - scrollPosition / 1500;
            
            document.querySelector('.fog5_1').style.opacity = fogOpacity;
            document.querySelector('.fog5_2').style.opacity = fogOpacity;
          }

          if(scrollPosition > 0 && !zeoliteBack) {
            setAnimationOn(true);
            for (let i = 0; i < 3; i++) {
              setTimeout(() => {
                setExplainVisible((prevState) => {
                  const newVisible = [...prevState];
                  newVisible[i] = true;
                  return newVisible;
                });
              }, i * 500);
            }
            setTimeout(() => {
              setAnimationOn(false);
              setZeoliteBack(true);
            }, 4000); // 2초 후 애니메이션 상태 해제
          }

          // 스크롤이 500에 도달하면 zeolite와 explain 이미지들 애니메이션 실행
          if (scrollPosition > 1500 && !fogVisible) {
            setFogVisible(true);
            setAnimationOn(true);

            setSinhaScale(0.4);
            setTimeout(() => setZeolitesVisible(true), 4000); // 2초 후 애니메이션 상태 해제
            setTimeout(() => {
              setAnimationOn(false);
              setExplainOffset(1);
              setExplainVisible([false, false, false]);
            }, 4000); // 2초 후 애니메이션 상태 해제
        }

          // sinha 이미지의 이동과 크기 변화
          if (zeolitesVisible) {
            setSinhaScale((nowSinhaScale) => {
                if(nowSinhaScale < 0.39999999999) return 0.4;
                if(nowSinhaScale > 1.3) {
                  if(!nextBackground) {
                    setTimeout(() => setNextBackground(true), 3000); // 2초 후 애니메이션 상태 해제                
                  }
                  return 1.3;
                }

                const newSinhaScale = nowSinhaScale + (delta * 0.0001);
                return newSinhaScale;
            });

            setExplainOffset((prev) => {
              const newOpacity = Math.min(Math.max(prev - delta * 0.0003, 0), 1); // 0~1 사이로 제한

              if(sinhaScale < 0.39999999999) return 1;
              if(sinhaScale >= 1.3) {
                return 0;
              }
    
              return newOpacity;
            });
          }
        };

        if(nextBackground) {
          setTimeout(() => {
            navigate("/phaze6"); // Redirect to another page after zoom
          }, 1000);
        }
    
        window.addEventListener("wheel", handleScroll, { passive: false });
    
        return () => {
          window.removeEventListener("wheel", handleScroll);
        };
    }, [scrollPosition, explainVisible, zeoliteBack, zeolitesVisible]);

      return (
        <div className={'fifth-page'}>
            <div className={'content5'}>
                <img src="/images/song/phaze5/background5.png" alt='background' className="background5"/>
                <img src="/images/song/phaze5/fog5_1.png" className={`fog5_1 ${imgsVisible ? 'visible5' : fogVisible ? 'hidden5' : ''}`}/>       
                <img src="/images/song/phaze5/fog5_2.png" className={`fog5_2 ${imgsVisible ? 'visible5' : fogVisible ? 'hidden5' : ''}`}/>
                <img src="/images/song/phaze5/zeolite5.png" className={`zeolite5 ${(imgsVisible && !zeoliteBack) ? 'visible5' : (imgsVisible && zeoliteBack) ? 'hidden5' : ''}`}/>

                <img src="/images/song/phaze5/explain5_1.png" 
                  className={`explain5_1 ${explainVisible[0] ? 'slideIn5' : ''}`}
                  style={{ opacity: explainOffset }}
                />
                <img src="/images/song/phaze5/explain5_2.png" 
                  className={`explain5_2 ${explainVisible[1] ? 'slideIn5' : ''}`}
                  style={{ opacity: explainOffset }}
                  />
                <img src="/images/song/phaze5/explain5_3.png" 
                  className={`explain5_3 ${explainVisible[2] ? 'slideIn5' : ''}`}
                  style={{ opacity: explainOffset }}
                  />

                <img src="/images/song/phaze5/zeolites5.png" className={`zeolites5 ${zeolitesVisible ? 'fade-in-up' : ''}`}/>

                <img src="/images/song/phaze5/sinha5.png" 
                className={`sinha5 ${zeolitesVisible ? 'fade-in-up' : ''}`}
                style={{ transform: `scale(${sinhaScale})` }}
                />

                <img src="/images/song/phaze6/background6_1.png"
                  className={`next_background ${nextBackground ? 'showNext' : ''}`}
                />
            </div>
        </div>
    );
}