import React from 'react';
import Home from '../components/Home';
import { useFavorites } from './useFavourite';
import { useNavigate } from 'react-router-dom';

const FavoritesPokemonPage = () => {
  const [favorites,toggleFavorite] = useFavorites('favorites');
  const navigate = useNavigate();


  const handleAddToDetails = (name) => {
    navigate(`/detail/${name}`);
  };


  return (
    <div className="relative container mx-auto pt-[50px] px-5">
      <h2 className='text-center'>Favorite Pokemon</h2>
      {favorites.length === 0 ? (
        <p className="mx-auto text-center">No favorite items yet.</p>
      ) : (
        <div className="flex flex-wrap gap-[10px] md:gap-[0px] w-full  justify-center ">
          {favorites.map((item) => (
            <div key={item.id} className="m-4">
              <div  className="rounded w-[320px] overflow-hidden border rounded-[12px] shadow-2xl border-[#fcba03] m-2 transform transition-transform hover:scale-105 text-center">
                <div>
                <div className="w-full flex items-center justify-center border rounded-full w-[100px] h-[100px] mx-auto mb-[30px] bg-[#fcba03] mt-[20px]">
                    <img src={item.sprites.front_default} alt="" />
                  </div>
                  <div className="font-bold text-xl mb-2">{item.name}</div>
                  <p className="text-gray-700 text-base mb-2">Type: {item.types[0].type.name}</p>
                  <p className="text-gray-700 text-base mb-2">Weight: {item.weight}kg</p>
                  <p className="text-gray-700 text-base mb-2">Height: {item.height}cm</p>
                </div>
            
              <div className='flex justify-between'>
              <button onClick={() => handleAddToDetails(item.name)}  className="px-2 py-2 text-center flex-1 border-r hover:bg-amber-300 border">
                  View Details
                </button>
              <button
                  onClick={() => toggleFavorite(item)}
                  className="px-2 py-2 text-center flex-1 hover:bg-amber-300 border "
                >Remove  Favourite</button></div>
                  </div>
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesPokemonPage;

