// pokemonApiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const baseUrl = 'https://pokeapi.co/api/v2';

const fetchPokemon = createAsyncThunk("pokemon/fetchPokemon", async (page, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/pokemon/?offset=${(page - 1) * 6}&limit=6`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  });



const fetchPokemonDetails = createAsyncThunk(
    'pokemon/fetchPokemonDetails',
    async (name) => {
      try {
        const response = await fetch(name);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
      
      } catch (error) {
        throw new Error('Failed to fetch Pokemon details: ' + error.message);
      }
    }
  );


  const fetchNextPage= createAsyncThunk(
    "pokemon/fetchPreviousPokemon",
    async (page, { rejectWithValue }) => {
      try {
        const response = await fetch(`${baseUrl}/pokemon/?offset=${(page - 1) * 6}&limit=6`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  const fetchPreviousPokemon = createAsyncThunk(
    "pokemon/fetchPreviousPokemon",
    async (page, { rejectWithValue }) => {
      try {
        const response = await fetch(`${baseUrl}/pokemon/?offset=${(page - 1) * 6}&limit=6`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

  const fetchPokemonDetailsByName = createAsyncThunk(
    "pokemon/fetchPokemonDetailsByName",
    async (name, { rejectWithValue }) => {
      try {
        const response = await fetch(`${baseUrl}/pokemon/${name}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );


  const fetchPokemonGenerations = createAsyncThunk(
    "pokemon/fetchPokemonGenerations",
    async (_, { rejectWithValue }) => {
      try {
        const response = await fetch(`${baseUrl}/generation/`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.results;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );
  const fetchPokemonByGeneration = createAsyncThunk(
    "pokemon/fetchPokemonDetailsByName",
    async (name, { rejectWithValue }) => {
      try {
        const response = await fetch(`${baseUrl}/generation/${name}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
      } catch (error) {
        return rejectWithValue(error.message);
      }
    }
  );

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState: {
    items: [],
    currentPage: 1,
    status: 'idle',
    loading: false,
    error: null,
    details: null, 
    detailsLoading: false,
    detailsError: null,
    availableGenerations: [],
  },

  reducers: {
    setCurrentPage: (state, action) => {
      console.log(action.payload, "state action.");
      state.currentPage = action.payload + 1;
    },

      resetDetails: (state) => {
        state.details = null;
      },
},
  extraReducers: {
    [fetchPokemon.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchPokemon.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      },

    [fetchPokemon.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [fetchPokemonDetails.pending]: (state) => {
        state.loading = true;
        state.error = null;
      },
      [fetchPokemonDetails.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.items = payload;
      },
      [fetchPokemonDetails.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },

      [fetchNextPage.fulfilled]: (state, {payload}) => {
        state.loading = false;
        state.items = [...state.items, ...payload];
    },

      [fetchPreviousPokemon.pending]: (state) => {
        state.loading = true;
        state.error = null;
      },
      [fetchPreviousPokemon.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.items = payload;
        state.currentPage--
      },
      [fetchPreviousPokemon.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      },

      [fetchPokemonDetailsByName.pending]: (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      },
      [fetchPokemonDetailsByName.fulfilled]: (state, { payload }) => {
        state.detailsLoading = false;
        state.details = payload;
      },
      [fetchPokemonDetailsByName.rejected]: (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.error.message;
      },
      [   fetchPokemonByGeneration.pending]: (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      },
      [   fetchPokemonByGeneration.fulfilled]: (state, { payload }) => {
        state.detailsLoading = false;
        state.details = payload;
      },
      [   fetchPokemonByGeneration.rejected]: (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.error.message;
      },

      [ fetchPokemonGenerations.pending]: (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      },
      [fetchPokemonGenerations.fulfilled]: (state, { payload }) => {
        state.loading = false;
        state.availableGenerations = payload;
      },
      [fetchPokemonGenerations.rejected]: (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.error.message;
      },
  },
});

export { 
  fetchPokemon,
   fetchPokemonDetails,
   fetchPreviousPokemon,
   fetchPokemonDetailsByName,
   fetchNextPage,
   fetchPokemonByGeneration 
   ,fetchPokemonGenerations
  };
export default pokemonSlice.reducer;
export const { setCurrentPage ,resetDetails} = pokemonSlice.actions;
