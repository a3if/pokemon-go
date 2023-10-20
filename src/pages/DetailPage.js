import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  useParams } from 'react-router-dom';
import { fetchPokemonDetailsByName } from '../redux/slice/pokemonApiSlice';
import Loading from '../components/Loading';
import PokemonDetail from '../components/PokemonDetail';

const DetailPage = () => {
  const { name } = useParams();
  const dispatch = useDispatch();
  const { details, detailsLoading, detailsError } = useSelector((state) => state.pokemon);

  useEffect(() => {
    if (name) {
      dispatch(fetchPokemonDetailsByName(name));
    }
  }, [name]);

  
  if (details === null || detailsLoading) {
    return <Loading/>
  }

  if (detailsError) {
    return <p>Error: {detailsError}</p>;
  }

  return (
   <PokemonDetail details={details}/>
  );
};

export default DetailPage