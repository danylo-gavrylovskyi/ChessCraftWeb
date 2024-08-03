import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GameSelection from './components/GameSelection/GameSelection';
import BoardDimensions from './components/BoardDimensions/BoardDimensions';
import PlacePieces from './components/PlacePieces/PlacePieces';

import './App.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<GameSelection />} />
          <Route path="/board-dimensions" element={<BoardDimensions />} />
          <Route path="/place-pieces" element={<PlacePieces />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
