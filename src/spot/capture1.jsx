import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import background from './image/capture1/icon_background.png';
import captureIcon from './image/capture1/capture_icon.png';
import mapIcon from './image/capture1/map_icon.png';
import moonIcon from './image/capture1/moon_icon.png';
import Capture1 from './image/capture1/capture1.png';
import Capture2 from './image/capture1/capture2.png';
import Capture3 from './image/capture1/capture3.png';
import Capture4 from './image/capture1/capture4.png';
import Capture5 from './image/capture1/capture5.png';
import timeBackground from './image/capture1/time_background.png';
import dayText from './image/capture1/day_text.png';
import eveningText from './image/capture1/evening_text.png';
import nightText from './image/capture1/night_text.png';
import { audioRefs } from './detailAudio'; // 캡처 도중에 음악 정지하라고 해서 넣었는데, 음악 있는게 낫대 ㅎㅎ

const captures = [Capture1, Capture2, Capture3, Capture4, Capture5];

export default function CaptureComponent({ handleBackgroundChange }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [captureIndex, setCaptureIndex] = useState(-1);
    const [showTimeChange, setShowTimeChange] = useState(false);
    const [currentAudioTime, setCurrentAudioTime] = useState(0);
    const capturedPages = useSelector((state) => state.capturedPages);
    const audioFile = process.env.PUBLIC_URL + '/music/TakePicture.mp3';
    const audioRef = useRef(new Audio(audioFile)); 
    // const otherAudioRef = useRef(new Audio(process.env.PUBLIC_URL + '/music/detail-music.mp3'));


    const handleMapClick = () => {       
        navigate('/map');
    };

    const handleMoonClick = () => {
        setShowTimeChange(!showTimeChange);
    };


    const handleCaptureClick = () => {
        const currentPage = window.location.pathname; 
        // setCurrentAudioTime(audioRefs.otherAudio.currentTime);
        // audioRefs.otherAudio.pause();
        // audioRefs.otherAudio.currentTime = 0;
        // setTimeout(() => {
        //     if (captureIndex === -1 && currentAudioTime > 0) {
        //         audioRefs.otherAudio.currentTime = currentAudioTime; // 저장된 시간으로 이동
        //         audioRefs.otherAudio.play().catch((error) => console.log('Error playing audio:', error));
        //     }
        // }, captures.length * 1000);
        
        
        
        captures.forEach((_, index) => {
            setTimeout(() => {
                setCaptureIndex(index);
                if (index === captures.length - 1) {
                    setTimeout(() => {
                        setCaptureIndex(-1);
                    }, 1000);
                }
            }, index * 1000);
        });
        if (capturedPages.includes(currentPage)) {
            console.log('Page already captured:', currentPage);
            return; // 중복된 페이지는 추가하지 않음
        }
        console.log('Dispatching ADD_CAPTURED_PAGE with page:', currentPage); 
        dispatch({ 
            type: 'ADD_CAPTURED_PAGE', 
            payload: { page: currentPage }, // 현재 페이지를 payload로 저장
        });
    };

    const handleBackgroundSelect = (time) => () => {
        handleBackgroundChange(time);
    };

    useEffect(() => {
        if (captureIndex === captures.length - 1) {
            audioRef.current.play(); // 오디오 재생
        }
        // return () => {
        //     audioRefs.otherAudio.pause();
        //     audioRefs.otherAudio.currentTime = 0; // 음악 초기화
        // };
    },[captureIndex]);
    // useEffect(() => {
    //     // 캡처 애니메이션이 끝난 후 원래 음악을 저장된 시간부터 재생
    //     if (captureIndex === -1 && currentAudioTime > 0) {
    //         audioRefs.otherAudio.currentTime = currentAudioTime; // 저장된 시간으로 이동
    //         audioRefs.otherAudio.play(); // 음악 재생
    //     }
    // },[captureIndex]);

    return (
        <>
            <img src={background} alt='아이콘 배경' style={{ position: 'absolute', top: '930px', left: '1450px', width: '210px', zIndex: 2, opacity: 0.5 }} />
            <img src={mapIcon} alt="Map" onClick={handleMapClick} style={{ position: 'absolute', top: '938px', left: '1540px', cursor: 'pointer', zIndex: 2 }} />
            <img src={captureIcon} alt="Capture" onClick={handleCaptureClick} style={{ position: 'absolute', top: '942px', left: '1480px', cursor: 'pointer', zIndex: 2 }} />
            <img src={moonIcon} alt="Time" onClick={handleMoonClick} style={{ position: 'absolute', top: '942px', left: '1600px', cursor: 'pointer', zIndex: 2 }} />
            {showTimeChange &&(
                <>
                    <img src={timeBackground} alt='텍스트 배경' style={{ position: 'absolute', top: '770px', left: '1540px', width: '150px', zIndex: 2, opacity: 0.5 }} />
                    <img src={dayText} alt='오전 텍스트' style={{ position: 'absolute', top: '780px', left: '1590px', width: '50px', zIndex: 3 }} onClick={handleBackgroundSelect('day')} />
                    <img src={eveningText} alt='오후 텍스트' style={{ position: 'absolute', top: '830px', left: '1590px', width: '50px', zIndex: 3 }} onClick={handleBackgroundSelect('evening')}/>
                    <img src={nightText} alt='밤 텍스트' style={{ position: 'absolute', top: '875px', left: '1600px', width: '30px', zIndex: 3 }} onClick={handleBackgroundSelect('night')}/>
                </>
            )}
            
            
            {captureIndex >= 0 && (
                <img
                    src={captures[captureIndex]}
                    alt={`Capture ${captureIndex + 1}`}
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100%',
                        zIndex: 5,
                        transition: 'opacity 0.5s',
                        opacity: 0.9,
                    }}
                />
            )}
        </>
    );
}
