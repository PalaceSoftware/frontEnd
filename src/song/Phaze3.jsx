import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../song/phaze3/phaze3_base.css'
import '../song/phaze3/phaze3_img.css'
import '../song/phaze3/phaze3_explain.css'

export default function Phaze3() {

    const [scrollPosition, setScrollPosition] = useState(0);
    const [backgroundVisible, setBackgroundVisible] = useState(false);
    const [imgsVisible, setImgsVisible] = useState(false);
    const [imgs2Visible, setImgs2Visible] = useState(false);

    const [explain1Visible, setExplain1Visible] = useState([false, false, false, false]); // 각 explain이 보일 상태
    const [explain2Visible, setExplain2Visible] = useState([false, false, false, false, false]); // 각 explain이 보일 상태
    const [animationOn, setAnimationOn] = useState(false);

    const [movingPoint, setMovingPoint] = useState(0); // palace의 위치
    const [explainChange, setExplainChange] = useState(false); // 
    const [blinkWindow, setBlinkWindow] = useState(false);

    const navigate = useNavigate(); // For page navigation

    useEffect(() => {

        setTimeout(() => {
            setBackgroundVisible(true);
        }, 1000);

        setTimeout(() => {
            setImgsVisible(true);
        }, 2000);

        const handleScroll = (e) => {

          if (animationOn) return; // 상호작용 차단

          e.preventDefault();
          const delta = e.deltaY;

          setScrollPosition((prevScrollPosition) => {
            // 스크롤 위치를 업데이트하면서 반대 방향 이동을 허용
            const newScrollPosition = prevScrollPosition + delta;
            if (newScrollPosition <= 0) return 0;

            return newScrollPosition;
          });

          setMovingPoint((prevPalacePosition) => {
            const newMovingImgs = prevPalacePosition + delta * 0.1;
            if(explainChange && newMovingImgs > 730) return Math.max(newMovingImgs, 730);

            if(imgs2Visible) return 2400;
            
            return Math.min(newMovingImgs, 2400); // -600px 이상으로 이동하지 않도록 제한
          });

          if(movingPoint > 0 && movingPoint < 730 && explain1Visible.every(v => v === false)) {
            setAnimationOn(true);
            for (let i = 0; i < 4; i++) {
              setTimeout(() => {
                setExplain1Visible((prevState) => {
                  const newVisible = [...prevState];
                  newVisible[i] = true;
                  return newVisible;
                });
              }, i * 500);
            }
            
            setTimeout(() => {
                setExplainChange(true);
                setAnimationOn(false);
            }, 2000); // 2초 후 애니메이션 상태 해제
          }

          if(movingPoint >= 730 && explain1Visible.every(v => v === true)) {
            setAnimationOn(true);
            for (let i = 0; i < 4; i++) {
                setTimeout(() => {
                  setExplain1Visible((prevState) => {
                    const newVisible = [...prevState];
                    newVisible[i] = false;
                    return newVisible;
                  });
                }, i * 400);
              }
              setTimeout(() => setExplainChange(false), 4000); // 2초 후 애니메이션 상태 해제

              setTimeout(() => {
                for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                  setExplain2Visible((prevState) => {
                    const newVisible = [...prevState];
                    newVisible[i] = true;
                    return newVisible;
                  });
                }, i * 500);
              }}, 5000);
              
              setTimeout(() => setAnimationOn(false), 2000); // 2초 후 애니메이션 상태 해제
          }

          if(movingPoint >= 2400) {
            setImgs2Visible(true);
            setTimeout(() => {
                setBlinkWindow(true);
            }, 13000);
            setTimeout(() => {
                navigate("/phaze4"); // Redirect to another page after zoom
            }, 18000);
          }
        };
    
        window.addEventListener("wheel", handleScroll, { passive: false });
    

        return () => {
          window.removeEventListener("wheel", handleScroll);

        };
      }, [scrollPosition, animationOn, backgroundVisible, imgsVisible, movingPoint]);

      return (
        <div className={'third-page'}>
            <div className={'content3'}>
                <img src="/images/song/phaze3/background3.png" alt='background' 
                    className={`background3 ${backgroundVisible ? 'visible3_1' : ''}`}/> 
                <img src="/images/song/phaze3/explain3/explain3_1.png" 
                    className={`explain3_1 ${explain1Visible[0] ? 'slideIn3' : (explainChange && !explain1Visible[0]) ? 'slideOut3' : ''}`} />
                <img src="/images/song/phaze3/explain3/explain3_2.png" 
                    className={`explain3_2 ${explain1Visible[1] ? 'slideIn3' : (explainChange && !explain1Visible[1]) ? 'slideOut3' : ''}`} />
                <img src="/images/song/phaze3/explain3/explain3_3.png" 
                    className={`explain3_3 ${explain1Visible[2] ? 'slideIn3' : (explainChange && !explain1Visible[2]) ? 'slideOut3' : ''}`} />
                <img src="/images/song/phaze3/explain3/explain3_4.png" 
                    className={`explain3_4 ${explain1Visible[3] ? 'slideIn3' : (explainChange && !explain1Visible[3]) ? 'slideOut3' : ''}`} />

                <img src="/images/song/phaze3/fog3_1.png" className={`fog3_1 ${imgsVisible ? 'visible3_2' : ''}`}/>  
                <img src="/images/song/phaze3/fog3_2.png" className={`fog3_2 ${imgsVisible ? 'visible3_2' : ''}`}/>         
                
                <img src="/images/song/phaze3/palace3.png" className={`palace3 ${imgsVisible ? 'visible3_2' : ''}`}
                    style={{ transform: `translateX(${-movingPoint}px)` }}/>
                <img src="/images/song/phaze3/king3_1.png" className={`king3_1 ${imgsVisible ? 'visible3_2' : ''}`}
                    style={{ transform: `translateX(${-movingPoint}px)` }}/>


                <img src="/images/song/phaze3/explain3/explain3_5.png" 
                    className={`explain3_5 ${explain2Visible[0] ? 'slideIn3' : ''}`} />
                <img src="/images/song/phaze3/explain3/explain3_6.png" 
                    className={`explain3_6 ${explain2Visible[1] ? 'slideIn3' : ''}`} />
                <img src="/images/song/phaze3/explain3/explain3_7.png" 
                    className={`explain3_7 ${explain2Visible[2] ? 'slideIn3' : ''}`} />
                <img src="/images/song/phaze3/explain3/explain3_8.png" 
                    className={`explain3_8 ${explain2Visible[3] ? 'slideIn3' : ''}`} />
                <img src="/images/song/phaze3/explain3/explain3_9.png" 
                    className={`explain3_9 ${explain2Visible[4] ? 'slideIn3' : ''}`} />

                <img src="/images/song/phaze3/sinha3.png" 
                    className={`sinha3 ${imgs2Visible ? 'visible3_2' : ''}`}/>         
                <img src="/images/song/phaze3/king3_2.png" 
                    className={`king3_2 ${imgs2Visible ? 'visible3_2' : ''}`}/>    

                {blinkWindow && <div className="blink"></div>}
            </div>
        </div>
    );
}