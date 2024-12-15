import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Character from "./pages/Character";
import Favourites from "./pages/Favourites";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path=":id" element={<Character />} />
    </Routes>
  );
}

export default App;
