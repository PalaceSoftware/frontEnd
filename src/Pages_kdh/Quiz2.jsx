import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Quiz2.css';

function Quiz2() {
    const [selectedAnswer, setSelectedAnswer] = useState(''); // 선택한 답안 상태
    const [isCorrect, setIsCorrect] = useState(null); // 정답 여부 관리
    const [showModal, setShowModal] = useState(false); // 모달 표시 여부
    const [previousPage, setPreviousPage] = useState('/scrolldownpage#quiz'); // 기본 경로 설정
    const location = useLocation();
    const navigate = useNavigate();

    const correctAnswer = '이몽룡'; // 정답

    // 정답 확인 함수
    const checkAnswer = () => {
        setIsCorrect(selectedAnswer === correctAnswer);
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
        // location.state가 있으면 전달받은 경로로, 없으면 기본값 설정
        const newPage = location.state && location.state.from
            ? location.state.from // 전달받은 경로로 돌아가기
            : '/scrolldownpage#quiz'; // 만약 from이 없으면 기본 경로로 이동 (예외 처리)

        navigate(newPage); // 전달받은 경로로 이동
    };

    return (
        <div className="quiz2">
            <div className='quiz-nav'>
                <img src={process.env.PUBLIC_URL + '/logo-horizontal.png'} alt="logo-h" className="logo-h" />

                <div className='nbutton-container'>
                    <a href="#event-info">행사정보</a>
                    <a href="#palace-tour" className="now-link">여행 정보</a>
                    <div className="link-with-check">
                        <img src={process.env.PUBLIC_URL + '/nav-check.png'} alt="quiz-check" className={'quiz-check fade-in'} />
                        <a href="#quiz" className="now-link">퀴즈 풀기</a>
                    </div>
                    <a href="#photo-album">스팟 사진첩</a>
                </div>
            </div>

            <img src={process.env.PUBLIC_URL + '/cloud.png'} alt="qcloud1" className="qcloud1" />
            <img src={process.env.PUBLIC_URL + '/cloud2.png'} alt="qcloud2" className="qcloud2" />
            <img src={process.env.PUBLIC_URL + '/cloud2.png'} alt="qcloud3" className="qcloud3" />

            <img src={process.env.PUBLIC_URL + '/quiz2-group.png'} alt="duru2" className="duru2" />
            <div className='paper2'>
                <button className="close-paper-btn" onClick={handleCloseClick}>X</button>
                <div className='quiz2-container'>
                    {/* 객관식 선택지 */}
                    <div className="multiple-choice">
                        <label className={selectedAnswer === '바보 온달' ? 'selected' : ''}>
                            <input
                                type="radio"
                                value="바보 온달"
                                checked={selectedAnswer === '바보 온달'}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                style={{ display: 'none' }} // radio 버튼 숨기기
                            />
                            1. 바보 온달
                        </label>
                        <label className={selectedAnswer === '심청이' ? 'selected' : ''}>
                            <input
                                type="radio"
                                value="심청이"
                                checked={selectedAnswer === '심청이'}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                style={{ display: 'none' }} // radio 버튼 숨기기
                            />
                            2. 심청이
                        </label>
                        <label className={selectedAnswer === '이몽룡' ? 'selected' : ''}>
                            <input
                                type="radio"
                                value="이몽룡"
                                checked={selectedAnswer === '이몽룡'}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                style={{ display: 'none' }} // radio 버튼 숨기기
                            />
                            3. 이몽룡
                        </label>
                        <label className={selectedAnswer === '어사또' ? 'selected' : ''}>
                            <input
                                type="radio"
                                value="어사또"
                                checked={selectedAnswer === '어사또'}
                                onChange={(e) => setSelectedAnswer(e.target.value)}
                                style={{ display: 'none' }} // radio 버튼 숨기기
                            />
                            4. 어사또
                        </label>
                    </div>
                    <button onClick={checkAnswer} className="check-answer-btn2"></button>
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal">
                        <button onClick={closeModal} className="close-btn">&times;</button>
                        {isCorrect ? (
                            <img src={process.env.PUBLIC_URL + '/correct2.png'} alt="정답" />
                        ) : (
                            <img src={process.env.PUBLIC_URL + '/wrong2.png'} alt="오답" />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Quiz2;