import React, { useEffect } from "react";
import "./Gallery.css";
import pic1 from '../public/images/pic1.jpeg'
import pic2 from '../public/images/pic2.jpeg'
import pic3 from '../public/images/pic3.jpeg'
import pic4 from '../public/images/pic4.jpeg'
import pic5 from '../public/images/pic5.jpeg'
import pic6 from '../public/images/pic6.jpeg'
import pic7 from '../public/images/pic7.jpeg'
import pic8 from '../public/images/pic8.jpeg'
import pic10 from '../public/images/pic9.jpeg'
import pic11 from '../public/images/pic10.jpeg'
const Gallery = () => {


  useEffect(() => {
    function createStars() {
      const starsContainer = document.querySelector('.stars');
      if (!starsContainer) return; // Prevent null reference
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
      }
    }

    function createGallery() {
      const gallery = document.querySelector('.gallery');
      if (!gallery) return; // Prevent null reference
      const totalCards = 10;
      const radius = window.innerWidth < 768 ? 400 : 600;
      let currentAngle = 0;
      let isDragging = false;
      let startX = 0;
      let currentX = 0;
      
      const prevButton = document.querySelector('.nav-button.prev');
      const nextButton = document.querySelector('.nav-button.next');
      
      const imageUrls = [
        pic1, pic2, pic3, pic4, pic5,
        pic6, pic7, pic8, pic10, pic11
      ];
      
      for (let i = 0; i < totalCards; i++) {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `<img src="${imageUrls[i]}" alt="Romantic photo ${i + 1}">
                          <div class="number">${i + 1}</div>`;
        gallery.appendChild(card);
      }

      function rotateGallery(direction) {
        currentAngle += direction * 36;
        updateCards();
      }

      function updateCards() {
        const cards = document.querySelectorAll('.card');
        cards.forEach((card, index) => {
          const angle = (currentAngle + (index * (360 / totalCards))) * (Math.PI / 180);
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const rotateY = angle * (180 / Math.PI);
          
          card.style.transform = `translate3d(${x}px, 0, ${z}px) rotateY(${rotateY}deg)`;
        });
      }

      prevButton.addEventListener('click', () => rotateGallery(1));
      nextButton.addEventListener('click', () => rotateGallery(-1));
      updateCards();
    }

    createStars();
    createGallery();

  }, []); // Runs only once after the component mounts

  return (
    <div className="gallery-body">
      <div className="ambient-light"></div>
      <div className="spotlight"></div>
      <div className="stars"></div>
      <button className="nav-button prev" aria-label="Previous"></button>
      <button className="nav-button next" aria-label="Next"></button>
      <div className="gallery-container">
        <div className="gallery"></div>
      </div>
    </div>
  );
};

export default Gallery;
