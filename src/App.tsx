import { Route, Routes, BrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard";
import CharacterDetails from "./pages/CharacterDetails";
import Favourites from "./pages/Favourites";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path=":id" element={<CharacterDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
