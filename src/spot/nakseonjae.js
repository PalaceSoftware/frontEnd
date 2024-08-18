import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import nakseonjae from './image/nakseonjae.png';
import king from './image/nakseonjae_king.png';
import maid from './image/nakseonjae_maid.png';
import book from './image/book.png';


export default function Nakseonjae() {
    const [showImages, setShowImages] = useState(false);
    const navigate = useNavigate();
    const handleIconClick = (path) => {
        navigate(path);
    };

    useEffect(() => {
      const timer = setTimeout(() => {
        setShowImages(true);
      }, 2000); 
  
      return () => clearTimeout(timer);
    }, []);
  return (
    <div style={{ position: 'relative' }}>
      <img src={nakseonjae} alt="배경" style={{ width: '100%' }} />
      <div style={{ position: 'absolute', top: '40%', left: '70%' }} onClick={() => handleIconClick('/nakseonjae/book')}>
        <img src={book} alt="서책" style={{ width: '350px', cursor: 'pointer' }} />
      </div>
      {showImages && (
        <>
          <img src={king} alt="왕" style={{ position: 'absolute', top: '50%', left: '60%', width: '230px' }} />
          <img src={maid} alt="궁녀" style={{ position: 'absolute', top: '50%', left: '45%', width: '170px' }} />
        </>
      )}
    </div>
  );

}