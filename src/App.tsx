import { Route, Routes, BrowserRouter } from "react-router";
import Dashboard from "./pages/Dashboard";
import CharacterView from "./pages/CharacterView";
import Favourites from "./pages/Favourites";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path=":id" element={<CharacterView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
