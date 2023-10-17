import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MenuItemCarousel = ({ item, onClose }) => {
  const modalStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '38%', 
    height: '38%', 
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: '1000', 
  };

  const carouselStyle = {
    background: 'white',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    textAlign: 'center',
    position: 'relative',
  };

  const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer',
  };

  return (
    <div style={modalStyle} className="menu-item-carousel-modal">
      <div style={carouselStyle} className="menu-item-carousel" >
      <button
      style={{...closeButtonStyle,zIndex: 1,background: 'red', color: 'white',  padding: '8px 16px',borderRadius: '4px',  }}onClick={onClose}>
      Close
      </button>
        <Carousel showStatus={false} showThumbs={false}>
          <div>
            <img src={item.image} alt={item.name} />
          </div>
        </Carousel>
        <div className="item-description">
          <h3>{item.name}</h3>
          <p>₹{item.price.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCarousel;


