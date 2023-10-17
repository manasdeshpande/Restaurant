import Link from 'next/link'
import React from 'react'

const MainContent = () => {
  return (
    <>
        <div className="flex items-center justify-center mt-20 p-8">
      <div className="max-w-4xl w-full px-2 rounded-lg ">
        <h1 className="text-[8rem] font-thin text-center font-title text-white select-none">Elysium</h1>
        <p className="text-2xl lg:px-[3.1em] font-semibold text-justify mb-6 font-navlinks text-white select-none"> Where culinary artistry meets elegance. Immerse yourself in a world of gastronomic delight as we tantalize your taste buds with our exceptional five-star dining experience.</p>
        <div className="flex justify-center">
          <Link href='/table' passHref>
          <button className="text-xl px-4 py-3 w-[10em] mr-4 mt-3 bg-white text-black font-medium rounded-[2rem] hover:bg-white font-navlinks">
            Book a Table
          </button>
          </Link>
          <Link href='/menu' passHref>
          <button className="text-xl px-6 py-3 mt-3 w-[10em] bg-white text-black font-medium rounded-[2rem] hover:bg-white font-navlinks">
            Menu
          </button>
          </Link>
        </div>
      </div>
    </div>
    </>
  )
}

export default MainContent