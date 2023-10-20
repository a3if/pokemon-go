import { configureStore } from "@reduxjs/toolkit";
import pokemonApiSlice from "../slice/pokemonApiSlice";

const store = configureStore({
  reducer: {
  pokemon:pokemonApiSlice,
  }
});

export default store;
