import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import '../song/phaze7/phaze7_base.css'
import '../song/phaze7/phaze7_img.css'
import '../song/phaze7/phaze7_explain.css'

export default function SelectAppeal() {

  const [images, setImages] = useState([
    '/images/song/phaze7/appeal7_1.png',
    '/images/song/phaze7/appeal7_2.png',
    '/images/song/phaze7/appeal7_3.png',
    '/images/song/phaze7/appeal7_4.png',
    '/images/song/phaze7/appeal7_5.png'
  ]);
  const [animationOn, setAnimationOn] = useState(false);
  const [backgroundVisible, setBackgroundVisible] = useState(false);
  const [imgsVisible, setImgsVisible] = useState(false);

  const [landVisible, setLandVisible] = useState([false, false, false, false]);


  const [currentIndex, setCurrentIndex] = useState(0); // 중앙 이미지의 인덱스 (처음에는 세 번째 이미지)
  const [isRotating, setIsRotating] = useState(false);
  const [rotationDirection, setRotationDirection] = useState(''); // 추가: 회전 방향 상태
  const [rotationAngle, setRotationAngle] = useState(0); // 현재 회전 값을 저장
  const [isClicked, setIsClicked] = useState(false); // 클릭 여부 관리
  const [showOpenImage, setShowOpenImage] = useState(false); // 추가: appeal_open101 이미지 표시 여부

  const [scrollPosition, setScrollPosition] = useState(0); // 스크롤 위치 추적
  const [opacity1, setOpacity1] = useState(0); // 이미지1의 opacity 값
  const [opacity2, setOpacity2] = useState(0); // 이미지2의 opacity 값

  const [finalImgsChange, setFinalImgsChange] = useState(false); // appeal_open101의 최대 이동 상태
  const [blurWhite, setBlurWhite] = useState(false); // appeal_open101의 최대 이동 상태

  const navigate = useNavigate(); // For page navigation

  const handleClick = () => {
    setIsClicked(true); // 클릭 시 상태 변화
    setTimeout(() => {
        setIsClicked(false);
        setShowOpenImage(true);
        setScrollPosition(0);
    }, 2000);
  };

    // Throttle 함수 정의 (한 번 호출 후 일정 시간이 지나기 전에는 다시 호출되지 않도록 함)
  const throttle = (func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  };

  setTimeout(() => {
    setBackgroundVisible(true);
  }, 1000);

  setTimeout(() => {
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        setLandVisible((prevState) => {
          const newVisible = [...prevState];
          newVisible[i] = true;
          return newVisible;
        });
      }, i * 500);
    }
  }, 1500);

  setTimeout(() => {
    setImgsVisible(true);
  }, 4000);


  useEffect(() => {
    const handleScroll = (e) => {

      e.preventDefault();

      if(animationOn || isRotating) return;

      const delta = e.deltaY; // 스크롤의 Y 방향 변화량

      if(!isRotating && !showOpenImage) {
        if (delta > 0) {
          setIsRotating(true);
          // 스크롤이 아래로(오른쪽으로 회전)
          setRotationAngle((prevAngle) => prevAngle - 72);
          setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          setTimeout(() => {
            setIsRotating(false);
          }, 1000); // 회전 애니메이션 시간
        } else {
          setIsRotating(true);
          // 스크롤이 위로(왼쪽으로 회전)
          setRotationAngle((prevAngle) => prevAngle + 72);
          setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
          setTimeout(() => {
            setIsRotating(false);
          }, 1000); // 회전 애니메이션 시간
        }
      }


      setScrollPosition((prevScrollPosition) => {
        // 스크롤 위치를 업데이트하면서 반대 방향 이동을 허용
        const newScrollPosition = prevScrollPosition + delta;
        if (newScrollPosition <= 0) return 0;
        
        return newScrollPosition;
      });

      // appeal_open101 이미지 이동: 1510px까지는 자유롭게 이동, 그 이후에는 고정
      const appealOpenElement = document.querySelector('.appeal_open7');
    if (appealOpenElement) {  // 요소가 존재하는지 확인
      if (scrollPosition < 1510) {
        appealOpenElement.style.transform = `translateX(${Math.min(scrollPosition, 1510)}px)`;
      } else {
        appealOpenElement.style.transform = `translateX(1510px)`; // 1510px에서 고정
      }
    }

     // 글자들 등장/사라짐 애니메이션 조절
     if (scrollPosition >= 1510 && scrollPosition <= 3010) {
        setOpacity1((scrollPosition - 1510) / 200); // 0에서 1로 서서히
      } else if (scrollPosition > 3010 && scrollPosition <= 4510) {
        setOpacity1((1910 - scrollPosition) / 200); // 1에서 0으로 서서히
      } else {
        setOpacity1(0); // 그 외 구간에서는 투명
      }
  
      if (scrollPosition >= 3010 && scrollPosition <= 4510) {
        setOpacity2((scrollPosition - 3010) / 200); // 0에서 1로 서서히
      } else if (scrollPosition > 4510) {
        setOpacity2(1); // 1에서 0으로 서서히
      } else {
        setOpacity2(0); // 그 외 구간에서는 투명
      }

      if(scrollPosition >= 6010) {
        setAnimationOn(true);
        setFinalImgsChange(true);
        setTimeout(() => {
          setBlurWhite(true);
        }, 2500); 
        setTimeout(() => {
          navigate("/loading")
        }, 4000); 
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });


    return () => {
      window.removeEventListener("wheel", handleScroll);

    };
}, [scrollPosition, isRotating, images.length]);

  return (
    
    <div className={`seventh-page`}>
        <img src="/images/song/phaze6/background6_3.png" alt='background' className="background7_1"/>
        <div className={`content7 ${backgroundVisible ? 'visible7_1' : ''}`}>
            <div className={`dark-overlay ${isClicked ? 'active' : ''}`}></div>
            <div className={`white-overlay ${blurWhite ? 'active7_2' : ''}`}></div>

            {isClicked && (
              <>
                <img src="/images/song/phaze7/flower/flower7_1.png" className="flower1"/>
                <img src="/images/song/phaze7/flower/flower7_2.png" className="flower2"/>
                <img src="/images/song/phaze7/flower/flower7_3.png" className="flower3"/>
                <img src="/images/song/phaze7/flower/flower7_4.png" className="flower4"/>
                <img src="/images/song/phaze7/flower/flower7_1.png" className="flower5"/>
                <img src="/images/song/phaze7/flower/flower7_2.png" className="flower6"/>
                <img src="/images/song/phaze7/flower/flower7_3.png" className="flower7"/>
                <img src="/images/song/phaze7/flower/flower7_4.png" className="flower8"/>
                <img src="/images/song/phaze7/hak7_1.png" className="hak1"/>
                <img src="/images/song/phaze7/hak7_2.png" className="hak2"/>
              </>
                )
            }


            <img src="/images/song/phaze7/background/background7_1.png" alt='background' className={`background7_2 ${backgroundVisible ? 'visible7_1' : ''}`}/>

            <img src="/images/song/phaze7/background/land7_1.png" alt='background' className={`land7_1 ${landVisible[0] ? 'visible7_1' : ''}`}/>
            <img src="/images/song/phaze7/background/land7_2.png" alt='background' className={`land7_2 ${landVisible[1] ? 'visible7_1' : ''}`}/>
            <img src="/images/song/phaze7/background/land7_3.png" alt='background' className={`land7_3 ${landVisible[2] ? 'visible7_1' : ''}`}/>
            <img src="/images/song/phaze7/background/land7_4.png" alt='background' className={`land7_4 ${landVisible[3] ? 'visible7_1' : ''}`}/>

            
            <img src="/images/song/phaze7/cloud7.png" alt='background' className="cloud1_1"/>
            <img src="/images/song/phaze7/cloud7.png" alt='background' className="cloud1_2"/>
            <img src="/images/song/phaze7/cloud7.png" alt='background' className="cloud1_3"/>
            <img src="/images/song/phaze7/cloud7.png" alt='background' className="cloud1_4"/>
            <img src="/images/song/phaze7/cloud7.png" alt='background' className="cloud1_5"/>

            <img src="/images/song/phaze7/hak7_1.png" alt='background' className="hak7_1"/>
            <img src="/images/song/phaze7/hak7_2.png" alt='background' className="hak7_2"/>

            {showOpenImage ? (
                <>
                <img 
                src="/images/song/phaze7/appeal_open7.png" 
                alt="Appeal Open" 
                className="appeal_open7"
                style={{
                    transition: 'transform 0.2s ease-out',
                }} 
              />
              <img
                src="/images/song/phaze7/explain7_3.png"
                alt="Image 1"
                className="explain7_3"
              />
              <img
                src="/images/song/phaze7/explain7_4.png"
                alt="Image 1"
                className="explain7_4"
              />
              <img
                src="/images/song/phaze7/explain7_5.png"
                alt="Image 1"
                className="explain7_5"
              />
              <img
                src="/images/song/phaze7/tree7.png"
                alt="Image 1"
                className={`tree7 ${finalImgsChange ? 'finalImgs' : ''}`}
              />
            {finalImgsChange 
              && Array.from({ length: 3 }, (_, i) => (
                <>
                  <img 
                    key={i} 
                    src="/images/song/phaze7/flower/flower7_1.png" 
                    alt="Flower" 
                    className={`flower flower7_1-${i + 1}`} 
                  />
                  <img 
                  src="/images/song/phaze7/flower/flower7_2.png" 
                  alt="Flower" 
                  className={`flower flower7_2-${i + 1}`} 
                />        
                <img 
                  src="/images/song/phaze7/flower/flower7_3.png" 
                  alt="Flower" 
                  className={`flower flower7_3-${i + 1}`} 
                />           
                <img 
                  src="/images/song/phaze7/flower/flower7_4.png" 
                  alt="Flower" 
                  className={`flower flower7_4-${i + 1}`} 
                />            
                </>
                ))
              }

            <img
              src="/images/song/phaze7/explain7_1.png"
              alt="Image 1"
              className="explain101_1"
              style={{
                opacity: opacity1, // 스크롤에 따라 opacity 조절
                transition: 'opacity 0.2s ease-out, transform 0.2s ease-out', // 자연스러운 애니메이션 적용
              }}
            />
            <img
              src="/images/song/phaze7/explain7_2.png"
              alt="Image 2"
              className="explain101_2"
              style={{
                opacity: opacity2, // 스크롤에 따라 opacity 조절
                transition: 'opacity 0.2s ease-out, transform 0.2s ease-out', // 자연스러운 애니메이션 적용
              }}
            />
            {finalImgsChange && <div className="whiteout-overlay"></div>}
        </>
        ) : (
            <>
            <div className={`image-container ${imgsVisible ? 'visible7_2' : ''}`}>
            <div
              className={`image-wrapper ${isRotating ? 'rotate' : ''}`}
              style={{ transform: `rotateY(${rotationAngle}deg)` }} // 회전각을 적용
            >                    
                {images.map((imgSrc, index) => {
                  const imageRotationAngle = 72 * index; // 이미지의 기본 각도 (72도씩 배치)
                  const currentRotation = rotationAngle % 360; // 현재 전체 회전각을 360도로 나눈 나머지
                  const totalRotation = imageRotationAngle + currentRotation; // 각 이미지의 최종 회전 상태
                
                  return (
                    <div
                      key={index}
                      className={`image ${index === currentIndex ? 'center-image' : ''}`}
                      style={{
                        transform: `
                        rotateY(${imageRotationAngle}deg) 
                        translateZ(500px) 
                        rotateY(${-totalRotation}deg)`,
                        pointerEvents: index === currentIndex ? 'auto' : 'none',
                      }}
                      onClick={(index === currentIndex && index === 4)? handleClick : null} // center image만 클릭 이벤트 핸들러 연결
                      >
                      <img src={imgSrc} alt={`Appeal ${index + 1}`} />
                      </div>
                      );
                    })}
                </div>
            </div>
            </>
          )}

        </div>
    </div>
  );
}
