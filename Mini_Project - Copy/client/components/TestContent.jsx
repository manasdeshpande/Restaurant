import Link from 'next/link';
import React from 'react';

const TestContent = () => {
  return (
    <>
      <div className="flex items-center justify-center mt-20 p-8">
        <div className="max-w-4xl w-full px-2 rounded-lg">
          <h1 className="text-7xl lg:text-9xl mt-8 font-thin text-center font-title text-white select-none">
            Elysium
          </h1>
          <p className="text-xl lg:text-2xl px-1 lg:px-20 mt-8 lg:mt-12 font-semibold text-center lg:text-justify mb-6 font-navlinks text-white select-none">
            Where culinary artistry meets elegance. Immerse yourself in a world
            of gastronomic delight as we tantalize your taste buds with our
            exceptional five-star dining experience.
          </p>
          <div className="flex justify-center">
            <Link href='/table' passHref>
              <button className="text-xl lg:text-2xl px-4 lg:px-6 py-3 w-[8em] lg:w-[8em] mr-4 mt-3 bg-white text-black font-medium rounded-[2rem] hover:bg-white font-navlinks">
                Reserve
              </button>
            </Link>
            <Link href='/menu' passHref>
              <button className="text-xl lg:text-2xl px-6 py-3 w-[8em] lg:w-[8em] mt-3 bg-white text-black font-medium rounded-[2rem] hover:bg-white font-navlinks">
                Menu
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestContent;
