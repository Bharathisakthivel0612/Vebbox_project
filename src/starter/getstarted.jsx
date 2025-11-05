import React, { useState } from 'react'
import './getstarted.css'
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { Link } from 'react-router-dom';

export const Getstarted = () => {
  
  const [showQuote, setShowQuote] = useState(false);

 
  const handleTitleClick = () => {
    setShowQuote(prev => !prev);
  };

  return (
    <div className='get-container'>
      <div className='get-nav'>
        <p className='circle'></p>
        <p>Student </p>
      </div>
      <div className='get-box1'>
        <p className="gs-tittle" onClick={handleTitleClick} style={{ cursor: 'pointer' }}>
          Get Ready
        </p>
        <p className='gs-p1'>Sharp your brain</p>
        
          <p className='gs-p2'>
            "Reading is an art".
          </p>
        <Link to={'/login'}>
          <button className='gs-btn'>Get Started</button>
        </Link>
      </div>
      <div className='get-fotter'>
        <p className='get-icon'><FacebookOutlinedIcon className='ic' /></p>
        <p className='get-icon'><GoogleIcon className='ic' /></p>
        <p className='get-icon'><InstagramIcon className='ic' /></p>
        <p className='get-icon'><WhatsAppIcon className='ic' /></p>
      </div>
    </div>
  )
}