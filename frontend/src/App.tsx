import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import GameSelection from "./components/GameSelection/GameSelection";
import BoardDimensions from "./components/BoardDimensions/BoardDimensions";
import ChessPieceCreation from "./components/ChessPieceCreation/ChessPieceCreation";
import PlacePieces from './components/PlacePieces/PlacePieces';

import { GamesetProvider } from "./GamesetContext";

import './App.css';

const App: React.FC = () => {
  return (
    <GamesetProvider>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<GameSelection />} />
            <Route path="/board-dimensions" element={<BoardDimensions />} />
            <Route
              path="/chess-piece-creation"
              element={<ChessPieceCreation />}
            />
            <Route path="/place-pieces" element={<PlacePieces />} />
          </Routes>
        </div>
      </BrowserRouter>
    </GamesetProvider>
  );
};

export default App;
