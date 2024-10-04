import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz1.css';

function Quiz1() {
    const [answer, setAnswer] = useState(''); // 정답 상태 관리
    const [isCorrect, setIsCorrect] = useState(null); // 정답 여부 관리
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부
    const [previousPage, setPreviousPage] = useState('/scrolldownpage#quiz'); // 기본 경로 설정
    const location = useLocation();
    const navigate = useNavigate();

    // 정답 확인 함수
    const checkAnswer = () => {
        const correctAnswers = ['화재', '불']; // 복수 정답
        if (correctAnswers.includes(answer.trim())) {
            setIsCorrect(true);
        } else {
            setIsCorrect(false);
        }
        setShowModal(true); // 답을 제출하면 모달 표시
    };

    const closeModal = () => {
        setShowModal(false); // 모달 닫기
    };

    // 컴포넌트가 마운트될 때 이전 페이지의 경로를 상태로 설정
    useEffect(() => {
        console.log("location.state:", location.state); // 전달받은 state 로그 출력
        if (location.state && location.state.from) {
            setPreviousPage(location.state.from); // 전달받은 경로가 있으면 설정
        }
    }, [location]);

    // x 버튼 클릭 시 페이지 이동
    const handleCloseClick = () => {
        // location.state가 있으면 전달받은 경로로 이동, 없으면 기본값 설정
        const newPage = location.state && location.state.from
            ? location.state.from.includes('#quiz')
                ? location.state.from // 이미 #quiz가 있으면 그대로 이동
                : `${location.state.from}#quiz` // 없으면 #quiz 추가
            : '/scrolldownpage#quiz'; // 만약 from이 없으면 기본 경로로 이동

        navigate(newPage); // 해당 경로로 이동
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
            <audio ref={musicRef} src={process.env.PUBLIC_URL + '/music/detail-music.mp3'} loop />
            <div className="quiz1">
                <div className='quiz-nav'>
                    <img src={process.env.PUBLIC_URL + '/logo-horizontal.png'} alt="logo-h" className="logo-h" />

                    <div className='nbutton-container'>
                        <a href="#event-info">행사정보</a>
                        <a href="#palace-tour" className="now-link">궁궐 여행 정보</a>
                        <div className="link-with-check">
                            <img src={process.env.PUBLIC_URL + '/nav-check.png'} alt="quiz-check" className="quiz-check" />
                            <a href="#quiz" className="now-link">퀴즈 풀기</a>
                        </div>
                        <a href="#photo-album">스팟 사진첩</a>
                    </div>
                </div>

                <img src={process.env.PUBLIC_URL + '/cloud.png'} alt="qcloud1" className="qcloud1" />
                <img src={process.env.PUBLIC_URL + '/cloud2.png'} alt="qcloud2" className="qcloud2" />
                <img src={process.env.PUBLIC_URL + '/cloud2.png'} alt="qcloud3" className="qcloud3" />

                <img src={process.env.PUBLIC_URL + '/quiz1-group.png'} alt="duru" className="duru" />
                <div className='paper'>
                    <button className="close-paper-btn" onClick={handleCloseClick}>X</button>
                    <div className='quiz-container'>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            placeholder="적어주세요"
                            className="answer-input"
                        />
                        <button onClick={checkAnswer} className="check-answer-btn"></button>
                    </div>
                </div>

                {showModal && (
                    <div className="modal-overlay" onClick={closeModal}>
                        <div className="modal">
                            <button onClick={closeModal} className="close-btn">&times;</button>
                            {isCorrect ? (
                                <img src={process.env.PUBLIC_URL + '/correct1.png'} alt="정답" />
                            ) : (
                                <img src={process.env.PUBLIC_URL + '/wrong1.png'} alt="오답" />
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Quiz1;