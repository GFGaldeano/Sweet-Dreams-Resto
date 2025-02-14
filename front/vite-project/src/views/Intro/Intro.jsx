import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import styles from "./Intro.module.css";

const Intro = () => {
    const [showIntro, setShowIntro] = useState(true);
    const videoRef = useRef(null);
    const audioRef = useRef(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        const timer = setTimeout(() => {
            handleSkip(); 
        }, 30000);

        return () => clearTimeout(timer); 
    }, []);

    const handleSkip = () => {
        setShowIntro(false); 
        if (audioRef.current) audioRef.current.pause(); 
        navigate("/login"); 
    };

    const handleVideoPlay = () => {
        if (audioRef.current) {
            audioRef.current.currentTime = 0; 
            audioRef.current.play(); 
        }
    };

    const handleVideoEnd = () => {
        handleSkip(); 
    };

    if (!showIntro) return null; 

    return (
        <div className={styles.container}>
            <video
                ref={videoRef}
                className={styles.video}
                autoPlay
                playsInline
                onPlay={handleVideoPlay}
                onEnded={handleVideoEnd}
            >
                <source src="/intro.mp4" type="video/mp4" />
                Tu navegador no soporta la reproducción de videos.
            </video>
            <audio ref={audioRef} src="/intro-audio.mp3" />
            <button className={styles.button} onClick={handleSkip}>
                Saltar Intro
            </button>
        </div>
    );
};

export default Intro;
