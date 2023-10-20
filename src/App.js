
import "./App.css";
import { Route, Routes } from "react-router-dom";
import FavoritesPokemonPage from "./pages/FavoritesPokemonPage";
import ComparePokemonPage from "./pages/ComparePokemonPage";
import DetailPage from "./pages/DetailPage";

import Layout from "./Layout/Layout";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<HomePage />} />
          <Route path="/favourite" element={<FavoritesPokemonPage />} />
          <Route path="/compare" element={<ComparePokemonPage />} />
          <Route path="/detail/:name" element={<DetailPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
