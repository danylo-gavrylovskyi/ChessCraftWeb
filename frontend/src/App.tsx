import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameSelection from "./components/GameSelection/GameSelection";
import BoardDimensions from "./components/BoardDimensions/BoardDimensions";
import ChessPieceCreation from "./components/ChessPieceCreation/ChessPieceCreation";
import { GamesetProvider } from "./GamesetContext";
import Popup from "./components/AuthPopup/AuthPopup";
import "./App.css";

const App: React.FC = () => {
  const [popupType, setPopupType] = useState<"login" | "register" | null>(null);

  const showLoginPopup = () => setPopupType("login");
  const showRegisterPopup = () => setPopupType("register");
  const closePopup = () => setPopupType(null);

  return (
    <GamesetProvider>
      <BrowserRouter>
        <div className="App">
          <header className="header">
            <button className="auth-button" onClick={showLoginPopup}>
              Login
            </button>
            <button className="auth-button" onClick={showRegisterPopup}>
              Register
            </button>
          </header>
          {popupType && <Popup type={popupType} onClose={closePopup} />}
          <main className="main-content">
            <Routes>
              <Route path="/" element={<GameSelection />} />
              <Route path="/board-dimensions" element={<BoardDimensions />} />
              <Route
                path="/chess-piece-creation"
                element={<ChessPieceCreation />}
              />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </GamesetProvider>
  );
};

export default App;
