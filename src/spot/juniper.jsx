import React, { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import juniper from './image/juniper/juniper.png';
import book from './image/juniper/book_juniper.png';
import BackgroundAnimation from './backgroundAnimation1';
import detail from './image/juniper/juniper_detail.png';
import bookDetail from './image/juniper/juniper_book_detail.png';
import closeBook from './image/juniper/juniper_close_book.png';
import CaptureComponent from './capture1';
import { useNavigate, useLocation } from 'react-router-dom';
import '../Pages_kdh/ScrollDownPage.css';

export default function Juniper() {
  const [showImages, setShowImages] = useState(false);
  const [showBook, setShowBook] = useState(true);
  const [commentOpacity, setCommentOpacity] = useState(0);
  const [showBookDetail, setShowBookDetail] = useState(false); // 책 세부 정보 상태 추가
  const [background, setBackground] = useState('day');

  const handleBookClick = () => {
    setShowBookDetail(true); // 책 클릭 시 세부 정보 표시
    setShowBook(false);
  };

  const handleCloseBookClick = () => {
    setShowBookDetail(false); // 책 세부 정보 숨기기
    setShowBook(true);
  };

  const handleBackgroundChange = (time) => {
    setBackground(time);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImages(true);
      const opacityTimer = setInterval(() => {
        setCommentOpacity(prev => {
          if (prev < 0.8) {
            return prev + 0.08;
          } else {
            clearInterval(opacityTimer);
            return prev;
          }
        });
      }, 100);

      return () => clearInterval(opacityTimer);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const eventRef = useRef(null);
  const tourRef = useRef(null);
  const quizRef = useRef(null);
  const photoRef = useRef(null);
  const soloDetailRef = useRef(null);
  const coupleDetailRef = useRef(null);
  const togetherDetailRef = useRef(null);
  const infoEvent1Ref = useRef(null);
  const infoEvent2Ref = useRef(null);
  const infoEvent3Ref = useRef(null);

  const location = useLocation(); // Hook to access the current location

  // 이미지 슬라이더 관련 상태 관리
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 사진 데이터 배열 (추가하려는 사진의 경로로 수정)
  const images = [
    'injungjun_photo.png',
    'buyongji_photo.png',
    'juniper_photo.png',
    'yunghwadang_photo.png',
    'nakseonjae_photo.png'
  ];

  // 캡처된 이미지 필터링
  const capturedPages = useSelector((state) => state.capturedPages);
  const capturedImages = images.filter((img) => capturedPages.includes(`/${img.split('_')[0]}`));
  const isImageCaptured = (index) => capturedImages[index] !== undefined;

  // 캡처된 이미지 기반으로 인덱스 가져오기
  const getImageIndex = (offset) => (currentImageIndex + offset + capturedImages.length) % capturedImages.length;

  const nextImage = () => {
    if (capturedImages.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % capturedImages.length);
    }
  };

  const prevImage = () => {
    if (capturedImages.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + capturedImages.length) % capturedImages.length);
    }
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    const imageObservers = [
      { ref: eventRef, className: 'event-check' },
      { ref: tourRef, className: 'tour-check' },
      { ref: quizRef, className: 'quiz-check' },
      { ref: photoRef, className: 'photo-check' }
    ];

    // 각 섹션을 관찰할 observer 배열
    const observers = imageObservers.map(({ ref, className }) => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target.querySelector(`.${className}`);
            if (img) {
              console.log('Visible class added to:', img); // 클래스 추가 시 로그
              img.classList.add('visible'); // visible 클래스 추가
            }
            observer.unobserve(entry.target); // 관찰 중지
          }
        });
      }, { threshold: 0.1 });

      if (ref.current) {
        observer.observe(ref.current);
      }

      return observer; // observer를 배열로 반환
    });

    // Cleanup function
    return () => {
      observers.forEach((observer, index) => {
        const { ref } = imageObservers[index];
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);


  useEffect(() => {
    if (location.hash === '#quiz' && quizRef.current) {
      scrollToSection(quizRef);  // Scroll to the quiz section when #quiz is present in the URL
    }
  }, [location]); // Re-run this when the location changes (i.e., when the URL hash changes)


  useEffect(() => {
    // Clone each item and append to the container for infinite scrolling
    const container = document.querySelector('.event-items-container');
    if (container) {
      const items = Array.from(container.children);

      // Clone each item and append to the container
      items.forEach((item) => {
        const clone = item.cloneNode(true);
        container.appendChild(clone);
      });

      container.classList.add('scrolling');
    }

    // Function to observe elements within a section
    const createObserver = (ref) => {
      const elements = ref.current.querySelectorAll('[data-order]');
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const order = entry.target.getAttribute('data-order');
            setTimeout(() => {
              entry.target.classList.add('visible');
              observer.unobserve(entry.target);
            }, order * 300);
          }
        });
      }, { threshold: 0.1 });

      elements.forEach((element) => {
        element.classList.add('fade-in');
        observer.observe(element);
      });

      return observer;
    };

    const observeButtons = (ref, buttonsClass) => {
      const buttons = ref.current.querySelector(buttonsClass);
      const buttonsObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            buttons.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      buttonsObserver.observe(buttons);
      return buttonsObserver;
    };

    // Create observers for each section
    const soloObserver = createObserver(soloDetailRef);
    const coupleObserver = createObserver(coupleDetailRef);
    const togetherObserver = createObserver(togetherDetailRef);

    // Observe buttons
    const soloButtonsObserver = observeButtons(soloDetailRef, '.solo-buttons');
    const coupleButtonsObserver = observeButtons(coupleDetailRef, '.c-buttons');
    const togetherButtonsObserver = observeButtons(togetherDetailRef, '.t-buttons');

    const infoEvent1Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // section의 모든 이미지에 'visible' 클래스를 추가
          const images = infoEvent1Ref.current.querySelectorAll('img');
          images.forEach((img, index) => {
            setTimeout(() => {
              img.classList.add('visible');
            }, index * 1000); // 순서에 따라 애니메이션을 지연시킵니다.
          });
          infoEvent1Observer.unobserve(entry.target); // 섹션이 보이면 더 이상 관찰하지 않음
        }
      });
    }, { threshold: 0.1 });

    if (infoEvent1Ref.current) {
      infoEvent1Observer.observe(infoEvent1Ref.current);
    }

    const infoEvent2Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // section의 모든 이미지에 'visible' 클래스를 추가
          const images = infoEvent2Ref.current.querySelectorAll('img');
          images.forEach((img, index) => {
            setTimeout(() => {
              img.classList.add('visible');
            }, index * 1000); // 순서에 따라 애니메이션을 지연시킵니다.
          });
          infoEvent2Observer.unobserve(entry.target); // 섹션이 보이면 더 이상 관찰하지 않음
        }
      });
    }, { threshold: 0.1 });

    if (infoEvent2Ref.current) {
      infoEvent2Observer.observe(infoEvent2Ref.current);
    }

    const infoEvent3Observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const logo = infoEvent3Ref.current.querySelector('.logo-v');
          setTimeout(() => {
            logo.classList.add('visible');
          }, 500); // 0.5초 후에 등장
          infoEvent3Observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    if (infoEvent3Ref.current) {
      infoEvent3Observer.observe(infoEvent3Ref.current);
    }

    const quizElements = quizRef.current.querySelectorAll('.quiz1-group, .quiz2-group, .quiz3-group');

    const quizObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Add the slide-down class to trigger the animation
          quizElements.forEach((element, index) => {
            setTimeout(() => {
              element.classList.add('slide-down');
            }, index * 300); // Delay each quiz container for staggered effect
          });
          quizObserver.unobserve(entry.target); // Stop observing once the animation starts
        }
      });
    }, { threshold: 0.1 });

    if (quizRef.current) {
      quizObserver.observe(quizRef.current);
      // quizRef.current.scrollIntoView({ behavior: 'auto' });
    }

    // Cleanup function to disconnect observers
    return () => {
      // Disconnect individual section observers
      if (soloDetailRef.current) {
        const elements = soloDetailRef.current.querySelectorAll('[data-order]');
        elements.forEach(element => soloObserver.unobserve(element));
      }
      if (coupleDetailRef.current) {
        const elements = coupleDetailRef.current.querySelectorAll('[data-order]');
        elements.forEach(element => coupleObserver.unobserve(element));
      }
      if (togetherDetailRef.current) {
        const elements = togetherDetailRef.current.querySelectorAll('[data-order]');
        elements.forEach(element => togetherObserver.unobserve(element));
      }
      if (infoEvent3Ref.current) {
        infoEvent3Observer.unobserve(infoEvent3Ref.current);
      }
      if (quizRef.current) {
        quizObserver.unobserve(quizRef.current);
      }
      soloButtonsObserver.disconnect();
      coupleButtonsObserver.disconnect();
      togetherButtonsObserver.disconnect();
      infoEvent1Observer.disconnect();
      infoEvent2Observer.disconnect();

    };
  }, []);

  const navigate = useNavigate();

  const handleQuiz1Click = () => {
    navigate('/quiz1', { state: { from: location.pathname + location.hash } });
  };

  const handleQuiz2Click = () => {
    navigate('/quiz2', { state: { from: location.pathname + location.hash } });
  };

  const handleQuiz3Click = () => {
    navigate('/quiz3', { state: { from: location.pathname + location.hash } });
  };

  return (
    <div className='App'>
      <div className='section juniper' style={{ position: 'relative' }}>
        <BackgroundAnimation background={background} />
        <CaptureComponent handleBackgroundChange={handleBackgroundChange} />
        <img src={juniper} alt="향나무" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />

        {showImages && (
          <img src={detail} alt="향나무 태그" style={{ position: 'absolute', top: '50px', left: '1500px', width: '100px', zIndex: 2, opacity: commentOpacity, transition: 'opacity 0.5s ease-in-out, left 1.5s ease-in-out' }} />
        )}

        {showBook && (
          <div style={{ position: 'absolute', top: '80%', left: '5%', zIndex: 3 }} onClick={handleBookClick}>
            <img src={book} alt="서책" style={{ width: '150px', cursor: 'pointer' }} />
          </div>
        )}

        {/* 책 세부 정보 표시 및 주변 희미하게 처리 */}
        {showBookDetail && (
          <>
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              zIndex: 2
            }} />
            <img src={bookDetail} alt="책 세부 정보" style={{ position: 'absolute', top: '520px', left: '850px', transform: 'translate(-50%, -50%)', width: '1400px', zIndex: 3 }} />
            <img src={closeBook} alt="책 닫기" style={{ position: 'absolute', top: '240px', left: '1270px', cursor: 'pointer', zIndex: 4 }} onClick={handleCloseBookClick} />
          </>
        )}
      </div>

      <div className="section juniper-event1" ref={infoEvent1Ref}>
        <img src={process.env.PUBLIC_URL + '/event1-1.png'} alt="event1-1" className="event1-1" />
        <img src={process.env.PUBLIC_URL + '/event1-2.png'} alt="event1-2" className="event1-2" />
        <img src={process.env.PUBLIC_URL + '/event1-3.png'} alt="event1-3" className="event1-3" />
      </div>
      <div className="section info-event2" ref={infoEvent2Ref}>
        <img src={process.env.PUBLIC_URL + '/event2-1.png'} alt="event2-1" className="event2-1" />
      </div>
      <div className="section info-event3" ref={infoEvent3Ref}>
        <img src={process.env.PUBLIC_URL + '/logo-vertical.png'} alt="logo-v" className="logo-v" />
      </div>

      <div id="event-info" className="section" ref={eventRef}>
        <div className='event-nav'>
          <img src={process.env.PUBLIC_URL + '/logo-horizontal.png'} alt="logo-h" className="logo-h" />

          <div className='nbutton-container'>
            <div className="link-with-check">
              <img src={process.env.PUBLIC_URL + '/nav-check.png'} alt="event-check" className={'event-check fade-in'} />
              <a href="#event-info" className="now-link">행사정보</a>
            </div>
            <a href="#palace-tour">여행 정보</a>
            <a href="#quiz">퀴즈 풀기</a>
            <a href="#photo-album">스팟 사진첩</a>
          </div>
        </div>


        <img src={process.env.PUBLIC_URL + '/event-title.png'} alt="event-title" className="event-title" />
        <div className='event-items-container'>
          <div className='event-item'>
            <img src={process.env.PUBLIC_URL + '/event1.png'} alt="Event Image" z />
            <div className='event-details'>
              <div className='event-name'>창덕궁 달빛 기행</div>
              <div className='event-date'>2024. 10. 04 - 2024. 10. 20</div>
            </div>
            <div className="overlay1"></div>
          </div>
          <div className='event-item'>
            <img src={process.env.PUBLIC_URL + '/event2.png'} alt="Event Image" z />
            <div className='event-details'>
              <div className='event-name'>창덕궁 야간 개장</div>
              <div className='event-date'>2024. 07. 01 - 2024. 10. 31</div>
            </div>
            <div className="overlay2"></div>
          </div>
          <div className='event-item'>
            <img src={process.env.PUBLIC_URL + '/event3.png'} alt="Event Image" z />
            <div className='event-details'>
              <div className='event-name'>창덕궁 농사 체험</div>
              <div className='event-date'>2024. 11. 20</div>
            </div>
            <div className="overlay3"></div>
          </div>
          <div className='event-item'>
            <img src={process.env.PUBLIC_URL + '/event4.png'} alt="Event Image" z />
            <div className='event-details'>
              <div className='event-name'>창덕궁 단풍 놀이</div>
              <div className='event-date'>2024. 09. 20 - 09. 30</div>
            </div>
            <div className="overlay4"></div>
          </div>
        </div>
      </div>

      <div id="palace-tour" className="section" ref={tourRef}>
        <div className='tour-nav'>
          <img src={process.env.PUBLIC_URL + '/logo-horizontal.png'} alt="logo-h" className="logo-h" />

          <div className='nbutton-container'>
            <a href="#event-info" >행사정보</a>
            <div className="link-with-check">
              <img src={process.env.PUBLIC_URL + '/nav-check.png'} alt="tour-check" className='tour-check fade-in' />
              <a href="#palace-tour" className="now-link">여행 정보</a>
            </div>
            <a href="#quiz">퀴즈 풀기</a>
            <a href="#photo-album">스팟 사진첩</a>
          </div>
        </div>

        <img src={process.env.PUBLIC_URL + '/tour-title.png'} alt="tour-title" className="tour-title" />
        <div className='tour-title2'>이리오너라와 함꼐 창덕궁으로 여행을 떠나요!</div>
        <div className='tour-title3'>다양한 투어 코스를 추천해드립니다.</div>
      </div>

      <div id="solo-tour" className="section">
        <div className='tour-nav'>
          <img src={process.env.PUBLIC_URL + '/logo-horizontal.png'} alt="logo-h" className="logo-h" />

          <div className='nbutton-container'>
            <a href="#event-info" >행사정보</a>
            <div className="link-with-check">
              <img src={process.env.PUBLIC_URL + '/nav-check.png'} alt="tour-check" className="tour-check" />
              <a href="#palace-tour" className="now-link">여행 정보</a>
            </div>
            <a href="#quiz">퀴즈 풀기</a>
            <a href="#photo-album">스팟 사진첩</a>
          </div>
        </div>

        <img src={process.env.PUBLIC_URL + '/solo-title.png'} alt="solo-title" className="solo-title" />

        <img src={process.env.PUBLIC_URL + '/ridiculous-front.png'} alt="solo-ridiculous" className="solo-ridiculous" />
      </div>

      <div id="solo-detail" className="section" ref={soloDetailRef}>
        <img src={process.env.PUBLIC_URL + '/dhm.png'} alt="dhm" className="dhm" data-order="1" />
        <img src={process.env.PUBLIC_URL + '/d1.png'} alt="ddhm" className="ddhm" data-order="2" />
        <img src={process.env.PUBLIC_URL + '/ijj.png'} alt="ijj" className="ijj" data-order="3" />
        <img src={process.env.PUBLIC_URL + '/d2.png'} alt="dijj" className="dijj" data-order="4" />
        <img src={process.env.PUBLIC_URL + '/pus.png'} alt="pus" className="pus" data-order="5" />
        <img src={process.env.PUBLIC_URL + '/d3.png'} alt="dpus" className="dpus" data-order="6" />
        <img src={process.env.PUBLIC_URL + '/djj.png'} alt="djj" className="djj" data-order="7" />
        <img src={process.env.PUBLIC_URL + '/d4.png'} alt="ddjj" className="ddjj" data-order="8" />
        <img src={process.env.PUBLIC_URL + '/nsj.png'} alt="nsj" className="nsj" data-order="9" />
        <img src={process.env.PUBLIC_URL + '/d5.png'} alt="dnsj" className="dnsj" data-order="10" />

        <img src={process.env.PUBLIC_URL + '/s-course1.png'} alt="s-course1" className="s-course1" data-order="11" />
        <img src={process.env.PUBLIC_URL + '/s-course2.png'} alt="s-course2" className="s-course2" data-order="12" />
        <img src={process.env.PUBLIC_URL + '/s-course3.png'} alt="s-course3" className="s-course3" data-order="13" />
        <img src={process.env.PUBLIC_URL + '/s-course4.png'} alt="s-course4" className="s-course4" data-order="14" />

        <img src={process.env.PUBLIC_URL + '/bdhm.png'} alt="bdhm" className="bdhm" data-order="15" />
        <img src={process.env.PUBLIC_URL + '/line1.png'} alt="solo-line1" className="solo-line1" data-order="16" />
        <img src={process.env.PUBLIC_URL + '/bijj.png'} alt="bijj" className="bijj" data-order="17" />
        <img src={process.env.PUBLIC_URL + '/line2.png'} alt="solo-line2" className="solo-line2" data-order="18" />
        <img src={process.env.PUBLIC_URL + '/bpus.png'} alt="bpus" className="bpus" data-order="19" />
        <img src={process.env.PUBLIC_URL + '/line3.png'} alt="solo-line3" className="solo-line3" data-order="20" />
        <img src={process.env.PUBLIC_URL + '/bdjj.png'} alt="bdjj" className="bdjj" data-order="21" />
        <img src={process.env.PUBLIC_URL + '/line4.png'} alt="solo-line4" className="solo-line4" data-order="22" />
        <img src={process.env.PUBLIC_URL + '/bnsj.png'} alt="bnsj" className="bnsj" data-order="23" />

        <div className='solo-buttons'>
          <img
            src={process.env.PUBLIC_URL + '/solo-button1.png'}
            alt="solo-button1"
            className="solo-button1"
            onClick={() => scrollToSection(soloDetailRef)}
          />
          <img
            src={process.env.PUBLIC_URL + '/solo-button2.png'}
            alt="solo-button2"
            className="solo-button2"
            onClick={() => scrollToSection(coupleDetailRef)}
          />
          <img
            src={process.env.PUBLIC_URL + '/solo-button3.png'}
            alt="solo-button3"
            className="solo-button3"
            onClick={() => scrollToSection(togetherDetailRef)}
          />
        </div>
      </div>

      <div id="couple-tour" className="section">
        <div className='tour-nav'>
          <img src={process.env.PUBLIC_URL + '/logo-horizontal.png'} alt="logo-h" className="logo-h" />

          <div className='nbutton-container'>
            <a href="#event-info" >행사정보</a>
            <div className="link-with-check">
              <img src={process.env.PUBLIC_URL + '/nav-check.png'} alt="tour-check" className="tour-check" />
              <a href="#palace-tour" className="now-link">여행 정보</a>
            </div>
            <a href="#quiz">퀴즈 풀기</a>
            <a href="#photo-album">스팟 사진첩</a>
          </div>
        </div>

        <img src={process.env.PUBLIC_URL + '/couple-title.png'} alt="couple-title" className="couple-title" />

        <img src={process.env.PUBLIC_URL + '/ridiculous-front.png'} alt="couple-ridiculous" className="couple-ridiculous1" />
        <img src={process.env.PUBLIC_URL + '/ridiculous-front.png'} alt="couple-ridiculous" className="couple-ridiculous2" />
      </div>

      <div id="couple-detail" className="section" ref={coupleDetailRef}>
        <img src={process.env.PUBLIC_URL + '/ijj.png'} alt="c-ijj" className="c-ijj" data-order="1" />
        <img src={process.env.PUBLIC_URL + '/d1.png'} alt="c-dijj" className="c-dijj" data-order="2" />
        <img src={process.env.PUBLIC_URL + '/hnm.png'} alt="c-hnm" className="c-hnm" data-order="3" />
        <img src={process.env.PUBLIC_URL + '/d2.png'} alt="c-dhnm" className="c-dhnm" data-order="4" />
        <img src={process.env.PUBLIC_URL + '/byj.png'} alt="c-byj" className="c-byj" data-order="5" />
        <img src={process.env.PUBLIC_URL + '/d3.png'} alt="c-dbyj" className="c-dbyj" data-order="6" />
        <img src={process.env.PUBLIC_URL + '/yhd.png'} alt="c-yhd" className="c-yhd" data-order="7" />
        <img src={process.env.PUBLIC_URL + '/d4.png'} alt="c-dyhd" className="c-dyhd" data-order="8" />
        <img src={process.env.PUBLIC_URL + '/nsj.png'} alt="c-nsj" className="c-nsj" data-order="9" />
        <img src={process.env.PUBLIC_URL + '/d5.png'} alt="c-dnsj" className="c-dnsj" data-order="10" />

        <img src={process.env.PUBLIC_URL + '/c-course1.png'} alt="c-course1" className="c-course1" data-order="11" />
        <img src={process.env.PUBLIC_URL + '/c-course2.png'} alt="c-course2" className="c-course2" data-order="12" />
        <img src={process.env.PUBLIC_URL + '/c-course3.png'} alt="c-course3" className="c-course3" data-order="13" />
        <img src={process.env.PUBLIC_URL + '/c-course4.png'} alt="c-course4" className="c-course4" data-order="14" />

        <img src={process.env.PUBLIC_URL + '/c-bijj.png'} alt="c-bijj" className="c-bijj" data-order="15" />
        <img src={process.env.PUBLIC_URL + '/line1.png'} alt="c-line1" className="c-line1" data-order="16" />
        <img src={process.env.PUBLIC_URL + '/c-bhnm.png'} alt="c-bhnm" className="c-bhnm" data-order="17" />
        <img src={process.env.PUBLIC_URL + '/line2.png'} alt="c-line2" className="c-line2" data-order="18" />
        <img src={process.env.PUBLIC_URL + '/c-bbyj.png'} alt="c-bbyj" className="c-bbyj" data-order="19" />
        <img src={process.env.PUBLIC_URL + '/line3.png'} alt="c-line3" className="c-line3" data-order="20" />
        <img src={process.env.PUBLIC_URL + '/c-byhd.png'} alt="c-byhd" className="c-byhd" data-order="21" />
        <img src={process.env.PUBLIC_URL + '/line4.png'} alt="c-line4" className="c-line4" data-order="22" />
        <img src={process.env.PUBLIC_URL + '/c-bnsj.png'} alt="c-bnsj" className="c-bnsj" data-order="23" />

        <div className='c-buttons'>
          <img
            src={process.env.PUBLIC_URL + '/c-button1.png'}
            alt="c-button1"
            className="c-button1"
            onClick={() => scrollToSection(soloDetailRef)}
          />
          <img
            src={process.env.PUBLIC_URL + '/c-button2.png'}
            alt="c-button2"
            className="c-button2"
            onClick={() => scrollToSection(coupleDetailRef)}
          />
          <img
            src={process.env.PUBLIC_URL + '/c-button3.png'}
            alt="c-button3"
            className="c-button3"
            onClick={() => scrollToSection(togetherDetailRef)}
          />
        </div>
      </div>

      <div id="together-tour" className="section">
        <div className='tour-nav'>
          <img src={process.env.PUBLIC_URL + '/logo-horizontal.png'} alt="logo-h" className="logo-h" />

          <div className='nbutton-container'>
            <a href="#event-info" >행사정보</a>
            <div className="link-with-check">
              <img src={process.env.PUBLIC_URL + '/nav-check.png'} alt="tour-check" className="tour-check" />
              <a href="#palace-tour" className="now-link">여행 정보</a>
            </div>
            <a href="#quiz">퀴즈 풀기</a>
            <a href="#photo-album">스팟 사진첩</a>
          </div>
        </div>

        <img src={process.env.PUBLIC_URL + '/together-title.png'} alt="together-title" className="together-title" />


        <img src={process.env.PUBLIC_URL + '/ridiculous-front.png'} alt="together-ridiculous" className="together-ridiculous1" />
        <img src={process.env.PUBLIC_URL + '/ridiculous-front.png'} alt="together-ridiculous" className="together-ridiculous2" />
        <img src={process.env.PUBLIC_URL + '/ridiculous-front.png'} alt="together-ridiculous" className="together-ridiculous3" />
      </div>

      <div id="together-detail" className="section" ref={togetherDetailRef}>
        <img src={process.env.PUBLIC_URL + '/dhm.png'} alt="t-dhm" className="t-dhm" data-order="1" />
        <img src={process.env.PUBLIC_URL + '/d1.png'} alt="t-ddhm" className="t-ddhm" data-order="2" />
        <img src={process.env.PUBLIC_URL + '/ijj.png'} alt="t-ijj" className="t-ijj" data-order="3" />
        <img src={process.env.PUBLIC_URL + '/d2.png'} alt="t-dijj" className="t-dijj" data-order="4" />
        <img src={process.env.PUBLIC_URL + '/gjk.png'} alt="t-gjk" className="t-gjk" data-order="5" />
        <img src={process.env.PUBLIC_URL + '/d3.png'} alt="t-dgjk" className="t-dgjk" data-order="6" />
        <img src={process.env.PUBLIC_URL + '/byj.png'} alt="t-byj" className="t-byj" data-order="7" />
        <img src={process.env.PUBLIC_URL + '/d4.png'} alt="t-dbyj" className="t-dbyj" data-order="8" />
        <img src={process.env.PUBLIC_URL + '/nsj.png'} alt="t-nsj" className="t-nsj" data-order="9" />
        <img src={process.env.PUBLIC_URL + '/d5.png'} alt="t-dnsj" className="t-dnsj" data-order="10" />

        <img src={process.env.PUBLIC_URL + '/t-course1.png'} alt="t-course1" className="t-course1" data-order="11" />
        <img src={process.env.PUBLIC_URL + '/t-course2.png'} alt="t-course2" className="t-course2" data-order="12" />
        <img src={process.env.PUBLIC_URL + '/t-course3.png'} alt="t-course3" className="t-course3" data-order="13" />
        <img src={process.env.PUBLIC_URL + '/t-course4.png'} alt="t-course4" className="t-course4" data-order="14" />

        <img src={process.env.PUBLIC_URL + '/t-bdhm.png'} alt="t-bdhm" className="t-bdhm" data-order="15" />
        <img src={process.env.PUBLIC_URL + '/line1.png'} alt="t-line1" className="t-line1" data-order="16" />
        <img src={process.env.PUBLIC_URL + '/t-bijj.png'} alt="t-bijj" className="t-bijj" data-order="17" />
        <img src={process.env.PUBLIC_URL + '/line2.png'} alt="t-line2" className="t-line2" data-order="18" />
        <img src={process.env.PUBLIC_URL + '/t-bgjk.png'} alt="t-bgjk" className="t-bgjk" data-order="19" />
        <img src={process.env.PUBLIC_URL + '/line3.png'} alt="t-line3" className="t-line3" data-order="20" />
        <img src={process.env.PUBLIC_URL + '/t-bbyj.png'} alt="t-bbyj" className="t-bbyj" data-order="21" />
        <img src={process.env.PUBLIC_URL + '/line4.png'} alt="t-line4" className="t-line4" data-order="22" />
        <img src={process.env.PUBLIC_URL + '/t-bnsj.png'} alt="t-bnsj" className="t-bnsj" data-order="23" />

        <div className='t-buttons'>
          <img
            src={process.env.PUBLIC_URL + '/t-button1.png'}
            alt="t-button1"
            className="t-button1"
            onClick={() => scrollToSection(soloDetailRef)}
          />
          <img
            src={process.env.PUBLIC_URL + '/t-button2.png'}
            alt="t-button2"
            className="t-button2"
            onClick={() => scrollToSection(coupleDetailRef)}
          />
          <img
            src={process.env.PUBLIC_URL + '/t-button3.png'}
            alt="t-button3"
            className="t-button3"
            onClick={() => scrollToSection(togetherDetailRef)}
          />
        </div>
      </div>


      <div id="quiz" className="section" ref={quizRef}>
        <div className='quiz-nav'>
          <img src={process.env.PUBLIC_URL + '/logo-horizontal.png'} alt="logo-h" className="logo-h" />

          <div className='nbutton-container'>
            <a href="#event-info" >행사정보</a>
            <a href="#palace-tour" className="now-link">여행 정보</a>
            <div className="link-with-check">
              <img src={process.env.PUBLIC_URL + '/nav-check.png'} alt="quiz-check" className={'quiz-check fade-in'} />
              <a href="#quiz" className="now-link">퀴즈 풀기</a>
            </div>
            <a href="#photo-album">스팟 사진첩</a>
          </div>
        </div>

        <img src={process.env.PUBLIC_URL + '/mountain.png'} alt="mountain" className="mountain" />
        <img src={process.env.PUBLIC_URL + '/cloud.png'} alt="cloud1" className="cloud1" />
        <img src={process.env.PUBLIC_URL + '/cloud.png'} alt="cloud2" className="cloud2" />
        <img src={process.env.PUBLIC_URL + '/cloud.png'} alt="cloud3" className="cloud3" />
        <img src={process.env.PUBLIC_URL + '/cloud.png'} alt="cloud4" className="cloud4" />
        <img src={process.env.PUBLIC_URL + '/crane.png'} alt="crane" className="crane" />

        <div>
          <img
            src={process.env.PUBLIC_URL + '/quiz1-group.png'}
            alt="quiz1-group"
            className="quiz1-group"
            onClick={handleQuiz1Click}
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + '/quiz2-group.png'}
            alt="quiz2-group"
            className="quiz2-group"
            onClick={handleQuiz2Click}
          />
        </div>
        <div>
          <img
            src={process.env.PUBLIC_URL + '/quiz3-group.png'}
            alt="quiz3-group"
            className="quiz3-group"
            onClick={handleQuiz3Click}
          />
        </div>
      </div>

      <div id="photo-album" className="section" ref={photoRef}>
        <div className='photo-nav'>
          <img src={process.env.PUBLIC_URL + '/logo-horizontal.png'} alt="logo-h" className="logo-h" />

          <div className='nbutton-container'>
            <a href="#event-info" >행사정보</a>
            <a href="#palace-tour" className="now-link">여행 정보</a>
            <a href="#quiz">퀴즈 풀기</a>
            <div className="link-with-check">
              <img src={process.env.PUBLIC_URL + '/nav-check.png'} alt="photo-check" className={'photo-check fade-in'} />
              <a href="#photo-album" className="now-link">스팟 사진첩</a>
            </div>
          </div>
        </div>

        <img src={process.env.PUBLIC_URL + '/photo-title.png'} alt="photo-title" className="photo-title" />

        <div className="photo-gallery">
          <button className="prev" onClick={prevImage}>{"<"}</button>
          <div className="photo-slider">
            {/* 두 이미지 슬롯 */}
            <div className="image-container-kdh">
              {capturedImages.length > 4 && isImageCaptured(getImageIndex(-2)) && (
                <img
                  src={`${process.env.PUBLIC_URL}/${capturedImages[getImageIndex(-2)]}`}
                  alt="prev-img"
                  className="llside-img"
                />
              )}
            </div>

            <div className="image-container-kdh">
              {capturedImages.length > 2 && isImageCaptured(getImageIndex(-1)) && (
                <img
                  src={`${process.env.PUBLIC_URL}/${capturedImages[getImageIndex(-1)]}`}
                  alt="prev-img"
                  className="lside-img"
                />
              )}
            </div>

            {/* 중앙 이미지 슬롯 */}
            <div className="image-container-kdh">
              {capturedImages.length > 0 && (
                <img
                  src={`${process.env.PUBLIC_URL}/${capturedImages[currentImageIndex]}`}
                  alt="current-img"
                  className="center-img"
                />
              )}
            </div>

            <div className="image-container-kdh">
              {capturedImages.length > 1 && isImageCaptured(getImageIndex(1)) && (
                <img
                  src={`${process.env.PUBLIC_URL}/${capturedImages[getImageIndex(1)]}`}
                  alt="next-img"
                  className="rside-img"
                />
              )}
            </div>

            <div className="image-container-kdh">
              {capturedImages.length > 3 && isImageCaptured(getImageIndex(2)) && (
                <img
                  src={`${process.env.PUBLIC_URL}/${capturedImages[getImageIndex(2)]}`}
                  alt="next-img"
                  className="rrside-img"
                />
              )}
            </div>
          </div>
          <button className="next" onClick={nextImage}>{">"}</button>
        </div>

        <a href={images[currentImageIndex]} download className="download-btn">
          <img src={process.env.PUBLIC_URL + '/download-icon.png'} alt="download" />
        </a>
      </div>
    </div>
  );
}
