import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemonDetailsByName, resetDetails } from "../redux/slice/pokemonApiSlice";

import PokemonCompare from "../components/PokemonCompare";
import Loading from "../components/Loading";

const ComparePokemonPage = () => {
  const dispatch = useDispatch();


  const [searchQuery1, setSearchQuery1] = useState("");
  const [details1, setDetails1] = useState(null);
  const [detailsLoading1, setDetailsLoading1] = useState(false);
  const [detailsError1, setDetailsError1] = useState(null);


  const [searchQuery2, setSearchQuery2] = useState("");
  const [details2, setDetails2] = useState(null);
  const [detailsLoading2, setDetailsLoading2] = useState(false);
  const [detailsError2, setDetailsError2] = useState(null);

 

  const handleSearch1 = () => {
    if (searchQuery1) {
      setDetailsLoading1(true);
      setDetailsError1(null);

      dispatch(fetchPokemonDetailsByName(searchQuery1))
        .then((result) => {
          setDetails1(result.payload);
          setDetailsLoading1(false);
        })
        .catch((error) => {
          setDetailsError1(error.message);
          setDetails1(null); 
          setDetailsLoading1(false); 
        })
        .finally(() => {
          if (!details1) {
            setDetailsError1("");
          }
        });

      setSearchQuery1('');
    }
  };

  const handleSearch2 = () => {
    if (searchQuery2) {
      setDetailsLoading2(true);
      setDetailsError2(null);

      dispatch(fetchPokemonDetailsByName(searchQuery2))
        .then((result) => {
          setDetails2(result.payload);
          setDetailsLoading2(false);
        })
        .catch((error) => {
          setDetailsError2(error.message);
          setDetails2(null); 
          setDetailsLoading2(false); 
        })
        .finally(() => {
          if (!details2) {
            setDetailsError2("");
          }
        });

      setSearchQuery2('');
    }
  };

  const handleReset1 = () => {
    setDetails1(null);
  };

  const handleReset2 = () => {
    setDetails2(null);
  };

  return (
    <div className=" md:px-[40px] px-[15px]">
      <h1 className="text-2xl font-bold mb-4 mt-[20px] text-center" >Compare Pokemon</h1>
      <div className="flex mb-4 flex-wrap md:flex-nowrap gap-y-[20px]">
        <div className=" md:w-1/2 w-full p-4 border rounded-2xl shadow-md md:mr-4 mr-0">
          <h2 className="text-lg font-semibold mb-2">Pokemon 1</h2>
          <input
            type="text"
            className="w-full rounded-md border p-2 mb-[20px]"
            placeholder="Enter Pokemon Name (Field 1)"
            value={searchQuery1}
            onChange={(e) => setSearchQuery1(e.target.value)}
          />
          <button
            className="rounded-md px-2 me-[10px] md:mb-[0px] mb-[10px] py-2 text-center flex-1 border-r hover:bg-amber-300 border"
            onClick={handleSearch1}
          >
            Search Pokemon 1
          </button>
          <button
            className="rounded-md px-2 py-2  text-center flex-1 border-r hover:bg-amber-300 border"
            onClick={handleReset1}
          >
            Reset Pokemon 1
          </button>
          {detailsLoading1 && <Loading />}
          {detailsError1 && <p className="text-red-500">{detailsError1}</p>}
          <PokemonCompare details={details1} />
        </div>

    
        <div className="md:w-1/2 w-full  p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Pokemon 2</h2>
          <input
            type="text"
            className="w-full rounded-md border p-2 mb-[20px]"
            placeholder="Enter Pokemon Name (Field 2)"
            value={searchQuery2}
            onChange={(e) => setSearchQuery2(e.target.value)}
          />
          <button
            className=" rounded-md px-2 py-2 me-[10px] md:mb-[0px] mb-[10px]  text-center flex-1 border-r hover:bg-amber-300 border"
            onClick={handleSearch2}
          >
            Search Pokemon 2
          </button>
          <button
            className=" rounded-md px-2 py-2 text-center flex-1 border-r hover:bg-amber-300 border"
            onClick={handleReset2}
          >
            Reset Pokemon 2
          </button>
          {detailsLoading2 && <Loading />}
          {detailsError2 && <p className="text-red-500">{detailsError2}</p>}
          <PokemonCompare details={details2} />
        </div>
      </div>
    </div>
  );
};

export default ComparePokemonPage;
