import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import changhoji1 from './image/changhoji/changhoji1.png';
import changhoji2 from './image/changhoji/changhoji2.png';
import changhoji3 from './image/changhoji/changhoji3.png';
import changhoji4 from './image/changhoji/changhoji4.png';
import changhoji5 from './image/changhoji/changhoji5.png';
import changhoji6 from './image/changhoji/changhoji6.png';
import changhoji7 from './image/changhoji/changhoji7.png';
import changhoji8 from './image/changhoji/changhoji8.png';
import candle1 from './image/changhoji/candle1.png';
import candle2 from './image/changhoji/candle2.png';
import fire1 from './image/changhoji/fire1.png';
import fire2 from './image/changhoji/fire2.png';
import fire3 from './image/changhoji/fire3.png';
import fire4 from './image/changhoji/fire4.png';
import fire5 from './image/changhoji/fire5.png';
import fire6 from './image/changhoji/fire6.png';
import book1 from './image/changhoji/changhoji_book1.png';
import book2 from './image/changhoji/changhoji_book2.png';
import nextPage from './image/changhoji/next_page.png';
import prevPage from './image/changhoji/previous_page.png';
import closeBook from './image/changhoji/close_book.png';
import backToNakseonjae from './image/changhoji/changhoji_close.png';
import './changhoji.css';

const changhojiImages = [
    changhoji1,
    changhoji2,
    changhoji3,
    changhoji4,
    changhoji5,
    changhoji6,
    changhoji7,
    changhoji8,
];

// fire 애니메이션 순서 정의
const fireSequence = [
    fire1,
    fire2,
    fire3,
    fire4,
    fire5,
    fire6,
    fire5,
    fire4,
    fire3,
    fire2,
];

export default function Changhoji() {
    const navigate = useNavigate();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [fireIndex, setFireIndex] = useState(0);
    const [candleIndex, setCandleIndex] = useState(0);
    const [showBook, setShowBook] = useState(false);
    const [showBook2, setShowBook2] = useState(false);
    const pageChangeSound = useRef(new Audio(process.env.PUBLIC_URL + '/music/change_page.mp3'));

    const handleScroll = () => {
        const scrollPosition = window.scrollY;
        const newIndex = Math.floor(scrollPosition / 600);
        if (newIndex < changhojiImages.length) {
            setCurrentImageIndex(newIndex);
        } else {
            setCurrentImageIndex(changhojiImages.length - 1);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        let interval;
        if (currentImageIndex === changhojiImages.length - 1) {
            interval = setInterval(() => {
                setFireIndex(prevIndex => {
                    const nextIndex = prevIndex + 1;
                    // fireIndex가 fireSequence의 길이를 초과하면 0으로 리셋
                    return nextIndex < fireSequence.length ? nextIndex : 0;
                });
                setCandleIndex((prevIndex) => (prevIndex + 1) % 2);
            }, 500);
        }
        return () => clearInterval(interval);
    }, [currentImageIndex]);

    const handleCandleClick = () => {
        setShowBook(true);
    };

    const handleNextPageClick = () => {
        pageChangeSound.current.play();
        setShowBook2(true);
        setShowBook(false);
        
    };

    const handlePrevPageClick = () => {
        pageChangeSound.current.play();
        setShowBook(true);
        setShowBook2(false);
    };

    const handleCloseBookClick = () => {
        setShowBook(false);
        setShowBook2(false);
    };

    const handleBackToNakseonjae = () => {
        navigate('/nakseonjae');
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
            <div className='custom-cursor-changhoji'>
                <div className="changhoji" style={{ height: '5270px', position: 'relative', overflow: 'hidden', width: '1710px' }}>
                    <img
                        src={changhojiImages[currentImageIndex]}
                        alt="창호지"
                        style={{
                            width: '1710px',
                            height: '1069px',
                            position: 'fixed',
                            top: '0%',
                            left: '0%',
                            zIndex: -1,
                        }}
                    />
                    <img src={backToNakseonjae} alt="낙선재로 돌아가기" style={{ position: 'fixed', width: '30px', top: '50px', left: '1620px', zIndex: 1, }} onClick={handleBackToNakseonjae} />
                    {currentImageIndex === changhojiImages.length - 1 && (
                        <>
                            {candleIndex === 0 ? (
                                <img
                                    src={candle1}
                                    alt="Candle 1"
                                    onClick={handleCandleClick}
                                    style={{
                                        position: 'absolute',
                                        top: '4750px',
                                        left: '855px',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 1,
                                        cursor: 'pointer',
                                    }}
                                />
                            ) : (
                                <img
                                    src={candle2}
                                    alt="Candle 2"
                                    onClick={handleCandleClick}
                                    style={{
                                        position: 'absolute',
                                        top: '4748px',
                                        left: '865px',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 1,
                                        cursor: 'pointer',
                                    }}
                                />
                            )}
                            {fireIndex === 0 && (
                                <img
                                    src={fire1}
                                    alt="Fire 1"
                                    style={{
                                        position: 'absolute',
                                        top: '4623px',
                                        left: '855px',
                                        width: '350px',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 0,
                                    }}
                                />
                            )}
                            {(fireIndex === 1 || fireIndex === 9) && (
                                <img
                                    src={fire2}
                                    alt="Fire 2"
                                    style={{
                                        position: 'absolute',
                                        top: '4623px',
                                        left: '858px',
                                        width: '350px',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 0,
                                    }}
                                />
                            )}
                            {(fireIndex === 2 || fireIndex === 8) && (
                                <img
                                    src={fire3}
                                    alt="Fire 3"
                                    style={{
                                        position: 'absolute',
                                        top: '4623px',
                                        left: '853px',
                                        width: '350px',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 0,
                                    }}
                                />
                            )}
                            {(fireIndex === 3 || fireIndex === 7) && (
                                <img
                                    src={fire4}
                                    alt="Fire 4"
                                    style={{
                                        position: 'absolute',
                                        top: '4623px',
                                        left: '858px',
                                        width: '350px',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 0,
                                    }}
                                />
                            )}
                            {(fireIndex === 4 || fireIndex === 6) && (
                                <img
                                    src={fire5}
                                    alt="Fire 5"
                                    style={{
                                        position: 'absolute',
                                        top: '4623px',
                                        left: '855px',
                                        width: '350px',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 0,
                                    }}
                                />
                            )}
                            {fireIndex === 5 && (
                                <img
                                    src={fire6}
                                    alt="Fire 6"
                                    style={{
                                        position: 'absolute',
                                        top: '4623px',
                                        left: '845px',
                                        width: '350px',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 0,
                                    }}
                                />
                            )}

                            {showBook && (
                                <>
                                    <img
                                        src={book1}
                                        alt="Book 1"
                                        style={{ position: 'absolute', top: '4750px', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}
                                    />
                                    <img
                                        src={nextPage}
                                        alt="Next Page"
                                        onClick={handleNextPageClick}
                                        style={{ position: 'absolute', top: '5030px', left: '1250px', transform: 'translate(-50%, -50%)', zIndex: 4, cursor: 'pointer' }}
                                    />
                                    <img
                                        src={closeBook}
                                        alt="Close Book"
                                        onClick={handleCloseBookClick}
                                        style={{ position: 'absolute', top: '4450px', left: '1330px', transform: 'translate(-50%, -50%)', zIndex: 3, cursor: 'pointer' }}
                                    />
                                </>
                            )}
                            {showBook2 && (
                                <>
                                    <img
                                        src={book2}
                                        alt="Book 2"
                                        style={{ position: 'absolute', top: '4750px', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 3 }}
                                    />
                                    <img
                                        src={prevPage}
                                        alt="Previous Page"
                                        onClick={handlePrevPageClick}
                                        style={{ position: 'absolute', top: '5030px', left: '450px', transform: 'translate(-50%, -50%)', zIndex: 3, cursor: 'pointer' }}
                                    />
                                    <img
                                        src={closeBook}
                                        alt="Close Book"
                                        onClick={handleCloseBookClick}
                                        style={{ position: 'absolute', top: '4450px', left: '1330px', transform: 'translate(-50%, -50%)', zIndex: 3, cursor: 'pointer' }}
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
