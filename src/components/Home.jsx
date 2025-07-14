import React from 'react'
import Container from '@mui/material/Container';
import '../styleComponents/homeStyle.css'
import Stack from '@mui/material/Stack';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useNavigate } from 'react-router-dom';
import AdminLogin from './AdminLogin';

function Home() {
  const navigate = useNavigate()
  const [showLoginAdin, setShowLoginAdmin] = useState(false)  // Toggles AdminLogin visibility

  function handleFeedbackClick() {
    navigate("/rating")
  }
  return (
  <div className='pagecontainer'>
  {showLoginAdin && <AdminLogin/>}
  <Container maxWidth="sm">

    {/* Admin login button at top-right corner */}
      <button className='admin'
      onClick={() => {
        setShowLoginAdmin(!showLoginAdin)  // Toggle admin login popup
      }}
      >Admin Login</button>


    <Stack spacing={2} className='stack' style={{display: showLoginAdin? "none": null}}>
        <div>
            <h1>Give Us Your 
                <TypingSpan text={"Feedback!"}/>
            </h1>
            <p style={{fontWeight:'bold' }}>We value your opinion and want to hear from you.</p>
        </div>
        <button  
        className='buttonfeedback'
        onClick={() => {
          handleFeedbackClick()  // Go to /rating page
        }}
        >
            <span>
              <ChatBubbleOutlineIcon className='icon'/>
              Give Feedback
            </span>
        </button>
    </Stack>
  </Container>
  </div>
  )
}

const TypingSpan = ({ text }) => {
    const [displayedCount, setDisplayedCount] = useState(0);  // Tracks number of visible characters
  
    useEffect(() => {
      let timeout;
      if (displayedCount < text.length) {
        timeout = setTimeout(() => setDisplayedCount(displayedCount + 1), 150); // Typing speed
      } else {
        // Restart after full text shown with a pause
        timeout = setTimeout(() => setDisplayedCount(0), 1500);
      }
      return () => clearTimeout(timeout); // Cleanup
    }, [displayedCount, text.length]);
  
    return (
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          fontFamily: "inherit", // match parent font
          fontSize: "inherit",   // match parent size
          marginLeft: "5px",     // optional space before typing
        }}
      >
        {text.slice(0, displayedCount)}  {/* Only show part of the text */}
        <motion.span
          animate={{ opacity: [0, 1, 0] }} // Cursor blinking
          transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
          style={{ display: "inline-block" }}
        >
          |
        </motion.span>
      </motion.span>
    );
};

export default Home