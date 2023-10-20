import React, { useEffect, useState } from 'react';
import Home from '../components/Home';
import { fetchNextPage, fetchPokemon, fetchPokemonDetails, fetchPokemonDetailsByName, fetchPreviousPokemon ,setCurrentPage ,searchInput,setSearchInput, fetchPokemonByGeneration, fetchPokemonGenerations} from '../redux/slice/pokemonApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const dispatch = useDispatch();
  const [detail, setDetails] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [selectedGeneration,setSelectedGeneration] =useState('')
  const [generation ,setGeneration] = useState([]);
  const [filterText, setFilterText] = useState("");
  const navigate = useNavigate();

  const { items, currentPage ,loading,availableGenerations,details,detailsLoading} = useSelector((state) => ({
    loading: state.pokemon.loading,
    items: state.pokemon.items,
    currentPage: state.pokemon.currentPage,
    availableGenerations: state.pokemon.availableGenerations,
    details:state.pokemon.details,
    detailsLoading:state.pokemon.detailsLoading
  }));




  useEffect(() => {
    dispatch(fetchPokemonGenerations());
  }, []);

  // useEffect(() => {
  //   dispatch(fetchPokemonByGeneration(selectedGeneration));
  // }, []);

  useEffect(() => {
    if (selectedGeneration) {
      dispatch(fetchPokemonByGeneration(selectedGeneration));
    } else {
      dispatch(fetchPokemon(currentPage));
    }
  }, [selectedGeneration]);



  const handleLoadMore = (e) => {
    e.preventDefault()
    dispatch(setCurrentPage(currentPage + 1));
    dispatch(fetchNextPage(currentPage + 1));
  };

  const handleLoadPrevious = (e) => {
    e.preventDefault()
    if(currentPage>1){
      dispatch(fetchPreviousPokemon(currentPage - 1));
    }
  };

  
  useEffect(() => {
    (async () => {
      const newDetails = [];
      if (items && items.results) {
        for (let i = 0; i < items.results.length; i++) {
          const pokemon = items.results[i];
          if (pokemon.name) {
            try {
              const pokemonName = pokemon.name;
              const response = await dispatch(fetchPokemonDetailsByName(pokemonName));
              
              if (!response.error) {
                newDetails.push(response.payload);
              } else {
                console.error('Error fetching Pokémon details:', response.error);
              }
            } catch (error) {
              console.error('Error fetching Pokémon details:', error);
            }
          }
        }
      }
      setDetails(newDetails);
    })();
  }, [items]);
  


  useEffect(() => {
    (async () => {
      const newDetails = [];
      if (details && details.pokemon_species) {
        for (let i = 0; i < details.pokemon_species.length; i++) {
          const pokemonSpecies = details.pokemon_species[i];
          if (pokemonSpecies.name) {
            try {
             
              const pokemonName = pokemonSpecies.name;
              const response = await dispatch(fetchPokemonDetailsByName(pokemonName));
              
              if (!response.error) {
                newDetails.push(response.payload);
              } else {
                console.error('Error fetching Pokémon details:', response.error);
              }
            } catch (error) {
              console.error('Error fetching Pokémon details:', error);
            }
          }
        }
      }
      setDetails(newDetails);
    })();
  }, [details]);
  
  
  const filteredDetails = selectedGeneration ? detail: detail;
  const filteredPokemons = filteredDetails.filter((item) =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );



  const handleAddToDetails = (name) => {
    navigate(`/detail/${name}`);
  };


  if (loading) {
    return <Loading/>;
  }
  if(detailsLoading){
    return <Loading/>
  }


  return (
    <>
      <Home details={details}  
      handleLoadMore={handleLoadMore}
       handleLoadPrevious={handleLoadPrevious } 
       setSearchInput={setSearchInput}
       searchInput={searchInput}
       selectedGeneration={selectedGeneration} 
       setSelectedGeneration={setSelectedGeneration}
       filterText={filterText}
       setFilterText={setFilterText}
       availableGenerations={availableGenerations}
       filteredPokemons={filteredPokemons}
       handleAddToDetails={handleAddToDetails}
       />
    </>
  );
};

export default HomePage;

