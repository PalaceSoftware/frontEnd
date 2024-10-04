import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../song/phaze1/phaze1_base.css";
import "../song/phaze1/phaze1_img.css";
import "../song/phaze1/phaze1_img2.css";

export default function Phaze1() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [greenDoor1Open, setDoorsOpen1] = useState(false);
  const [greenDoor2Open, setDoorsOpen2] = useState(false);
  const [firstDoorsOpen, setFirstDoorsOpen] = useState(false);
  const [adjustView, setAdjustView] = useState(false);
  const [appealMoving, setAppealMoving] = useState(false);
  const [blurBackground, setBlurBackground] = useState(false);
  const [showAppealOpen, setShowAppealOpen] = useState(false); // Appeal Open 상태 추가
  const [disableInteraction, setDisableInteraction] = useState(false); // 사용자 입력 차단 상태
  const [startZoom, setStartZoom] = useState(false); // New state for zoom effect
  const [hugeAppeal, setHugeAppeal] = useState(false); // New state for zoom effect

  const [animationOn, setAnimationOn] = useState(true);
  const [changeVisible1, setChangeVisible1] = useState(false);
  const [moveSunMoon, setMoveSunMoon] = useState(0);
  const [mountainOpcity, setMountainOpacity] = useState(0);


  const navigate = useNavigate(); // For page navigatio


  useEffect(() => {
    // 처음 화면이 시작되면 1초 대기 후 first door가 열리도록 함
    setTimeout(() => {
      setFirstDoorsOpen(true);
    }, 1000);
    setTimeout(() => {
      setChangeVisible1(true);
    }, 2500);

    const handleScroll = (e) => {
      e.preventDefault();
      const delta = e.deltaY;

      if (animationOn) {
        setMoveSunMoon((prev) => {
          // Sun과 Moon의 위치 변경
          const newMove = prev + delta * 0.1; // 스크롤에 따라 이동
          if (newMove <= 0) return 0;
          const sunPosition = Math.min(newMove, 1261); // Sun의 최대 이동 거리
          const moonPosition = Math.max(-newMove, -1261); // Moon의 최소 이동 거리

          // Sun과 Moon의 이미지 위치 변경
          document.querySelector('.sun1').style.transform = `translateX(${sunPosition}px)`;
          document.querySelector('.moon1').style.transform = `translateX(${moonPosition}px)`;

          return newMove;
        });

        setMountainOpacity((prev) => {
          const newOpacity = Math.min(Math.max(prev + delta * 0.0005, 0), 1); // 0과 1 사이로 제한
          const newMove = prev + delta * 0.1; // 스크롤에 따라 이동

          if (newMove <= 0) return 0;
          if (newMove >= 1261) return 1261;

          return newOpacity;
        });

        if (moveSunMoon >= 1261 && mountainOpcity >= 1 && animationOn) {
          setTimeout(() => {
            setScrollPosition(3000); // 원하는 위치로 이동
            setAnimationOn(false);
          }, 2000);
        }
      }

      if (disableInteraction || animationOn) return; // 상호작용 차단

      const newPosition = scrollPosition + delta;

      // 이전 위치로 돌아가는 것을 방지
      if (newPosition <= scrollPosition) {
        return; // 무조건 앞으로만 이동
      }

      // 스크롤 위치 제한 (최대 6000px)
      if (newPosition >= 5200) {
        setScrollPosition(5200); // 최대 스크롤을 6000px로 제한
        return;
      }

      if (newPosition >= 3000 && !greenDoor1Open) {
        setScrollPosition(3000);
        setTimeout(() => {
          setDoorsOpen1(true);
        }, 1000);
      } else if (greenDoor1Open && !adjustView && scrollPosition >= 3500) {
        setAdjustView(true);
        setScrollPosition(3500);
      } else if (newPosition >= 4500 && !greenDoor2Open) {
        setScrollPosition(4500);
        setTimeout(() => {
          setDoorsOpen2(true);
        }, 1000);
      } else {
        setScrollPosition((prev) => Math.max(prev + delta, 0));
      }
    };

    window.addEventListener("wheel", handleScroll, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [scrollPosition, greenDoor1Open, greenDoor2Open, adjustView, appealMoving, disableInteraction, moveSunMoon, mountainOpcity]);

  // 클릭 시 애니메이션과 Appeal Open을 처리
  const handleAppealClick = () => {
    setHugeAppeal(true);
    setTimeout(() => {
      setDisableInteraction(true);
      setAppealMoving(true);
      setBlurBackground(true);
    }, 1000)

    setTimeout(() => {
      setShowAppealOpen(true);
      setTimeout(() => {
        setStartZoom(true); // Trigger zoom effect
        setTimeout(() => {
          navigate("/phaze2"); // Redirect to another page after zoom
        }, 2000); // Wait for the zoom to complete (adjust time as needed)
      }, 2000);
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
      <audio ref={musicRef} src={process.env.PUBLIC_URL + '/music/start-music.mp3'} loop />
      <div className={`world ${blurBackground ? "blurred-background" : ""} ${disableInteraction ? "disable-interaction" : ""
        } ${startZoom ? "zoom" : ""}`}>
        <div
          className="stage"
          style={{
            transform: `translateY(${adjustView ? "-20%" : "0%"}) translateZ(${scrollPosition}px) scale(${startZoom ? 1.1 : 1})`,
          }} // scale을 추가하여 줌 효과 적용
        >
          <div className="house">
            {/* 첫 번째 문 */}
            <section className="wall wall-front" style={{ transform: "translateZ(-0px)" }}>
              <div className="first-doors">
                <img
                  src="images/song/phaze1/first_door1_1.png"
                  alt="Left Door"
                  className={`first-door-left ${firstDoorsOpen ? "open-forward" : ""}`}
                />
                <img
                  src="images/song/phaze1/first_door1_2.png"
                  alt="Right Door"
                  className={`first-door-right ${firstDoorsOpen ? "open-forward" : ""}`}
                />
              </div>
            </section>

            <section className="wall wall-front" style={{ transform: "translateZ(-1px)" }}>
              <div className="background-image">
                <img src="images/song/phaze1/background1_1.jpg" />
              </div>
              <img src="images/song/phaze1/explain1.png"
                className="explain1" />
              <img src="images/song/phaze1/mountain/mountain1_1.png"
                className={`mountain1_1 ${changeVisible1 ? "visible1_1" : ""}`} />
              <img src="images/song/phaze1/mountain/mountain1_3.png"
                className={`mountain1_3 ${changeVisible1 ? "visible1_1" : ""}`}
              />
              <img src="images/song/phaze1/mountain/sun1.png"
                className={`sun1 ${changeVisible1 ? "visible1_1" : ""}`} />
              <img src="images/song/phaze1/mountain/moon1.png"
                className={`moon1 ${changeVisible1 ? "visible1_1" : ""}`} />
              <img src="images/song/phaze1/mountain/tree1_1.png"
                className={`tree1_1 ${changeVisible1 ? "visible1_1" : ""}`} />
              <img src="images/song/phaze1/mountain/water1_1.png"
                className={`water1_1 ${changeVisible1 ? "visible1_1" : ""}`} />
              <img src="images/song/phaze1/mountain/water1_2.png"
                className={`water1_2 ${changeVisible1 ? "visible1_1" : ""}`} />

              <img src="images/song/phaze1/mountain/mountain1_2.png"
                style={{ opacity: mountainOpcity }} // mountain1_2의 opacity 조절
                className={`mountain1_2`} />
              <img src="images/song/phaze1/mountain/mountain1_4.png"
                style={{ opacity: mountainOpcity }} // mountain1_2의 opacity 조절
                className={`mountain1_4`} />
              <img src="images/song/phaze1/mountain/water1_3.png"
                style={{ opacity: mountainOpcity }} // mountain1_2의 opacity 조절
                className={`water1_3`} />
              <img src="images/song/phaze1/mountain/tree1_2.png"
                style={{ opacity: mountainOpcity }} // mountain1_2의 opacity 조절
                className={`tree1_2`} />

            </section>


            {/* 초록색 배경 문 */}
            <section className="wall wall-front" style={{ transform: "translateZ(-3000px)" }}>
              <div className="wall-content">
                <div className="background-image">
                  <img src="images/song/phaze1/background1_2.png" alt="Background" />
                </div>
                <div className="doors1">
                  <img
                    src="images/song/phaze1/second_door1_1.png"
                    alt="Left Door"
                    className={`door-left ${greenDoor1Open ? "open" : ""}`}
                  />
                  <img
                    src="images/song/phaze1/second_door1_2.png"
                    alt="Right Door"
                    className={`door-right ${greenDoor1Open ? "open" : ""}`}
                  />
                </div>

                <div className="doors2">
                  <img
                    src="images/song/phaze1/second_door1_1.png"
                    alt="Left Door"
                    className={`door-left ${greenDoor2Open ? "open" : ""}`}
                  />
                  <img
                    src="images/song/phaze1/second_door1_2.png"
                    alt="Right Door"
                    className={`door-right ${greenDoor2Open ? "open" : ""}`}
                  />
                </div>
              </div>
            </section>

            {/* Appeal 이미지 애니메이션 */}
            <section className="wall wall-front" style={{ transform: "translateZ(-4000px)" }}>
              <div className="wall-content">
                <div className="background-image">
                  <img src="images/song/phaze1/background1_3.png" alt="Background" />
                </div>

                <img src="images/song/phaze1/appeal1.png"
                  alt="Appeal"
                  className={`appeal-now ${hugeAppeal ? "move-left" : ""}`}
                  onClick={handleAppealClick} />
                <img src="images/song/phaze1/appeal1_paper.png" alt="Appeal Open"
                  className={`appeal_paper ${showAppealOpen ? "enter" : ""}`} />
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
}
