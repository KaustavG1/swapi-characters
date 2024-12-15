import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import CharacterDetails from "./pages/CharacterDetails";
import Favourites from "./pages/Favourites";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path=":id" element={<CharacterDetails />} />
    </Routes>
  );
}

export default App;
