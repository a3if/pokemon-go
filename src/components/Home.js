import React, { useState } from 'react';
import { useFavorites } from '../pages/useFavourite';

const Home = ({
 
  handleLoadMore,
  handleLoadPrevious,
  selectedGeneration,
  setSelectedGeneration,
  filterText,
  filteredPokemons,
  availableGenerations,
  setFilterText,
  handleAddToDetails

}) => {
  const [favorites, toggleFavorite] = useFavorites('favorites');
  return (
    <>
      <div className="flex flex-wrap md:justify-between my-[40px] justify-center items-center gap-[20px]  px-[50px]">
        <div>
          <input
            type="text"
            placeholder="Enter Pokemon name"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className=" px-4 py-2 rounded border border-[#fcba03] outline-none"
          />
        </div>

        <div className="relative inline-block text-left">
          <select
            value={selectedGeneration}
            onChange={(e) => setSelectedGeneration(e.target.value)}
            className="bg-[#fcba03] border border-[#fcba03] out text-white px-4 py-2 rounded focus:outline-none "
          >
            <option value="" disabled>
              Choose a generation
            </option>
            {availableGenerations.map((generation) => (
              <option key={generation.name} value={generation.name}>
                {generation.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-[10px] md:gap-[0px] max-w-[1200px] mx-auto justify-center ">
        {Array.isArray(filteredPokemons) && filteredPokemons.length > 0 ? (
          filteredPokemons.map((item) => (
            <div
              className="rounded w-[360px] overflow-hidden border rounded-[12px] shadow-2xl border-[#fcba03] m-2 transform transition-transform hover:scale-105 text-center"
              key={item.id}
            >
              <div className="px-6 py-4">
                <div className="w-[100px] flex items-center justify-center border rounded-full w-[100px] h-[100px] mx-auto mb-[30px] bg-[#fcba03] object-cover">
                  <img src={item.sprites.front_default} alt="" />
                </div>
                <div className="font-bold text-xl mb-2 capitalize">{item.name}</div>
                <p className="text-gray-700 text-base mb-2">Type: {item.types[0].type.name}</p>
                <p className="text-gray-700 text-base mb-2">Weight: {item.weight}kg</p>
                <p className="text-gray-700 text-base mb-2">Height: {item.height}cm</p>
              </div>
              <div className="md:px-6 px-3 py-4 flex justify-between">
                <button
                  onClick={() => handleAddToDetails(item.name)}
                  className="px-2 py-2 text-center flex-1 border-r hover:bg-amber-300 border"
                >
                  View Details
                </button>
                <button
                  onClick={() => toggleFavorite(item)}
                  className="px-2 py-2 text-center flex-1 hover:bg-amber-300 border "
                >
                  {favorites.some((favorite) => favorite.id === item.id)
                    ? "Remove Favorites"
                    : "Add to Favorites"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-red-500">
            No Pokémon details available 
          </p>
        )}
      </div>

      <div className="flex justify-center gap-[30px] my-[30px]">
        {filteredPokemons.length > 0 && (
          <button
            onClick={handleLoadPrevious}
            className="px-[10px] py-[10px] bg-yellow-500"
            disabled={filteredPokemons.length < 1}
          >
            Previous
          </button>
        )}
        {filteredPokemons.length > 0 && (
          <button onClick={handleLoadMore} className="p-[10px] bg-yellow-500">
            Next 2
          </button>
        )}
      </div>
    </>
  );
};

export default Home;
