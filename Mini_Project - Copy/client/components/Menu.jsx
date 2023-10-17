"use client";
import React, { useState } from 'react';
import Nav from './Nav';
import MenuItemCarousel from './MenuItemCarousel'; 

const Menu = () => {
  const initialMenuItems = [
    { id: 1, name: "Paneer Butter Masala", price: 400, image: "https://source.unsplash.com/random/900x700/?paneerbuttermasala" },
    { id: 2, name: "Biryani", price: 600, image: "https://source.unsplash.com/random/900x700/?biryani" },
    { id: 3, name: "Pasta", price: 350, image: "https://source.unsplash.com/random/900x700/?pasta" },
    { id: 4, name: "Burger", price: 350, image: "https://source.unsplash.com/random/900x700/?burger" },
    { id: 5, name: "Pizza", price: 650, image: "https://source.unsplash.com/random/900x700/?pizza" },
    { id: 6, name: "Sushi", price: 800, image: "https://source.unsplash.com/random/900x700/?sushi" },
    { id: 7, name: "Ramen", price: 450, image: "https://source.unsplash.com/random/900x700/?ramen" },
    { id: 8, name: "Tacos", price: 300, image: "https://source.unsplash.com/random/900x700/?tacos" },
    { id: 9, name: "Ice Cream", price: 250, image: "https://source.unsplash.com/random/900x700/?ice-cream" },
  ];

  const [selectedItem, setSelectedItem] = useState(null);
  const [carouselOpen, setCarouselOpen] = useState(false);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setCarouselOpen(true);
  };

  const closeCarousel = () => {
    setCarouselOpen(false);
  };

  return (
    <div>
      <Nav />
      <div className="p-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-12"> 
          {initialMenuItems.map((item) => (
            <div
              key={item.id}
              className={`bg-white rounded-lg shadow-md text-center cursor-pointer p-4 transform hover:scale-105 transition-transform ${
                selectedItem && selectedItem.id === item.id ? 'border-4 border-blue-500' : ''
              }`}
              onClick={() => handleItemClick(item)}
            >
              <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-t-lg" />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <p className="text-blue-600">₹{item.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {carouselOpen && (
        <MenuItemCarousel item={selectedItem} onClose={closeCarousel} />
      )}
    </div>
  );
};

export default Menu;


