import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // For React navigation
import "./Home.css";
import useSound from 'use-sound';
import song from "/audio/diyamu.aac" 

const Home = () => {


   const [play,{stop}] = useSound(song);
  
    useEffect(() => {
      const playAudio = async () => {
        try {
          await play(); // Attempt autoplay
          console.log("Autoplay successful!");
        } catch (err) {
          console.warn("Autoplay blocked. Retrying in 3 seconds...", err);
          setTimeout(play, 3000); // Retry after 3 seconds
        }
      };
  
      playAudio();
  
    }, [play]);

  const heartEmojis = ["💗", "💖", "💝", "💕", "♥️"];
  const gradients = [
    "linear-gradient(135deg, #ffafbd, #ffc3a0, #ffdde1)",
    "linear-gradient(135deg, #e0c3fc, #8ec5fc, #c2e9fb)",
    "linear-gradient(135deg, #ff9a9e, #fad0c4, #fad0c4)",
    "linear-gradient(135deg, #a18cd1, #fbc2eb, #fad0c4)",
    "linear-gradient(135deg, #ffecd2, #fcb69f, #fad0c4)",
  ];

  const [currentGradient, setCurrentGradient] = useState(0);
  const navigate=useNavigate()
  

  useEffect(() => {
    const createHeart = () => {
      const heart = document.createElement("div");
      heart.classList.add("home-heart");
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = Math.random() * 5 + 3 + "s";
      heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
      document.body.appendChild(heart);

      heart.addEventListener("animationend", () => {
        heart.remove();
      });
    };

    const interval = setInterval(createHeart, 600);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  const changeBackground = () => {
    const homeBody = document.querySelector('.home-body')
    setCurrentGradient((prev) => (prev + 1) % gradients.length);
    homeBody.style.background = gradients[currentGradient];
  };

  const navigateToGallery = () => {
    const transition = document.querySelector(".home-page-transition");
    if (transition) {
      transition.style.opacity = "1";
      setTimeout(() => {
        navigate("/gallery"); // Navigate using React Router
      }, 1000);
    }
  };

  return (
    <div  className="home-body">
      <div className="home-page-transition"></div>
      <div className="home-glass-container">
        <h1>Welcome to Our Gallery</h1>
        <p className="home-subtitle">Every moment with you is a treasure worth keeping...</p>
        <div className="home-btn-container">
          <button className="home-btn color-btn" onClick={changeBackground}>
            Change Colors 🎨
          </button>
          <button className="home-btn" onClick={navigateToGallery}>
            Enter Our Love Story ✨
          </button>
        </div>
      </div>
      <p className="home-love-msg">Made with love, for my World 💕</p>
    </div>
  );
};

export default Home;
