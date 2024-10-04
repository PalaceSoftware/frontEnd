import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import background from './assets/background.png';
import character1 from './assets/character1.png';
import character2 from './assets/character2.png';
import character3 from './assets/character3.png';
import character4 from './assets/character4.png';
import effect1 from './assets/effect1.png';
import effect2 from './assets/effect2.png';
import effect3 from './assets/effect3.png';
import effect4 from './assets/effect4.png';

export default function Loading() {
    const navigate = useNavigate();;
    const [characterPosition, setCharacterPosition] = useState(100);
    const [characterPosition1, setCharacterPosition1] = useState(0);
    const [clipValue, setClipValue] = useState(100);
    const [clipValue1, setClipValue1] = useState(0);
    const [effectVisible, setEffectVisible] = useState(true);

    useEffect(() => {
        const moveElements = () => {
            if (characterPosition > 24) {
                setCharacterPosition(prev => prev - 2);
            } else {
                clearInterval(animationInterval);
                setTimeout(() => {
                    navigate('/map');
                }, 1000);
            }
        };

        const animationInterval = setInterval(() => {
            moveElements();
        }, 100);

        return () => clearInterval(animationInterval);
    }, [characterPosition, navigate]);

    useEffect(() => {
        const moveElements = () => {
            if (characterPosition1 < 53) {
                setCharacterPosition1(prev => prev + 1.4);
            } else {
                clearInterval(animationInterval);
            }
        };

        const animationInterval = setInterval(() => {
            moveElements();
        }, 100);

        return () => clearInterval(animationInterval);
    }, [characterPosition1]);

    useEffect(() => {
        const effectTimer = setTimeout(() => {
            setEffectVisible(true);
        }, 1000);

        const clipPathTimer = setInterval(() => {
            setClipValue(prev => {
                if (prev > 0) {
                    return prev - 2.4;
                } else {
                    clearInterval(clipPathTimer);
                    return 0;
                }
            });
            setClipValue1(prev => {
                if (prev < 100) {
                    return prev + 2.6;
                } else {
                    clearInterval(clipPathTimer);
                    return 100;
                }
            });
        }, 100);

        return () => {
            clearTimeout(effectTimer);
            clearInterval(clipPathTimer);
        };
    }, []);

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
            <div style={{ position: 'relative', height: '1069px', width: '1710px', overflow: 'hidden' }}>
                <img
                    src={background}
                    alt="Background"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}
                />
                <img
                    src={character1}
                    alt="Character"
                    style={{
                        position: 'absolute',
                        top: '530px',
                        left: `${characterPosition}vw`,
                        width: '250px',
                        zIndex: 6,
                        transition: 'left 0.03s',
                    }}
                />
                <img
                    src={character2}
                    alt="Character"
                    style={{
                        position: 'absolute',
                        top: '280px',
                        left: `${characterPosition1}vw`,
                        width: '250px',
                        zIndex: 5,
                        transition: 'left 0.03s',
                    }}
                />
                <img
                    src={character3}
                    alt="Character"
                    style={{
                        position: 'absolute',
                        top: '80px',
                        left: `${characterPosition + 20}vw`,
                        width: '250px',
                        zIndex: 4,
                        transition: 'left 0.03s',
                    }}
                />

                <img
                    src={character4}
                    alt="Character"
                    style={{
                        position: 'absolute',
                        top: '40px',
                        left: `${characterPosition1 + 20}vw`,
                        width: '250px',
                        zIndex: 3,
                        transition: 'left 0.03s',
                    }}
                />
                {effectVisible && (
                    <>
                        <div
                            style={{
                                position: 'absolute',
                                top: '250px',
                                left: '530px',
                                width: '1400px',
                                height: '100%',
                                backgroundImage: `url(${effect1})`,
                                clipPath: `polygon(100% 0%, 100% 100%, ${clipValue}% 100%, ${clipValue}% 0%)`,
                                zIndex: 2,
                                transition: 'clip-path 0.1s linear',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: '200px',
                                left: '830px',
                                width: '1400px',
                                height: '100%',
                                backgroundImage: `url(${effect3})`,
                                clipPath: `polygon(100% 0%, 100% 50%, ${clipValue}% 50%, ${clipValue}% 0%)`,
                                zIndex: 2,
                                transition: 'clip-path 0.1s linear',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: '200px',
                                left: '00px',
                                width: '1000px',
                                height: '100%',
                                backgroundImage: `url(${effect2})`,
                                clipPath: `polygon(${clipValue1}% 0%, ${clipValue1}% 100%, 0% 100%, 0% 0%)`,
                                zIndex: 2,
                                transition: 'clip-path 0.1s linear',
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                top: '100px',
                                left: '350px',
                                width: '1000px',
                                height: '100%',
                                backgroundImage: `url(${effect4})`,
                                clipPath: `polygon(${clipValue1}% 0%, ${clipValue1}% 50%, 0% 50%, 0% 0%)`,
                                zIndex: 2,
                                transition: 'clip-path 0.1s linear',
                            }}
                        />
                    </>
                )}


            </div>
        </div>
    );
}
