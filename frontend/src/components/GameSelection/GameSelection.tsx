import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGameset } from "../../GamesetContext";
import { Gameset } from "../../classes/Gameset";
import styles from "./GameSelection.module.css";
import sampleGamesetConfig from "../../sampleGamesetConfig";

const GameSelection: React.FC = () => {
  const navigate = useNavigate();
  const { setActiveGame } = useGameset();
  const [showModePopup, setShowModePopup] = useState(false);
  const [activeTab, setActiveTab] = useState("myGames");
  const [games, setGames] = useState<any[]>([]);

  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const url = `${backendUrl}/api/games`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await response.json();
        console.log("token: ", localStorage.getItem("token"));
        console.log(data);
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };

    fetchGames();
  }, []);

  const handleGameClick = (game: any) => {
    setActiveGame(new Gameset(game.config));
    navigate("/board-dimensions");
  };

  const handleModeSelect = (mode: string) => {
    setShowModePopup(false);
    const newGame = new Gameset(sampleGamesetConfig);
    setActiveGame(newGame);
    navigate("/board-dimensions");
  };

  const closePopup = () => {
    setShowModePopup(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Select, or create a game</div>
      <div className={styles.contentFlex}>
        <div className={styles.left}>
          <div
            className={styles.newGameButton}
            onClick={() => handleModeSelect("new")}
          >
            <svg
              viewBox="0 0 199 200"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M28.4286 21.625C24.5196 21.625 21.3214 24.8312 21.3214 28.75V171.25C21.3214 175.169 24.5196 178.375 28.4286 178.375H170.571C174.48 178.375 177.679 175.169 177.679 171.25V28.75C177.679 24.8312 174.48 21.625 170.571 21.625H28.4286ZM0 28.75C0 13.0305 12.7484 0.25 28.4286 0.25H170.571C186.252 0.25 199 13.0305 199 28.75V171.25C199 186.97 186.252 199.75 170.571 199.75H28.4286C12.7484 199.75 0 186.97 0 171.25V28.75ZM88.8393 139.188V110.688H60.4107C54.5029 110.688 49.75 105.923 49.75 100C49.75 94.0773 54.5029 89.3125 60.4107 89.3125H88.8393V60.8125C88.8393 54.8898 93.5922 50.125 99.5 50.125C105.408 50.125 110.161 54.8898 110.161 60.8125V89.3125H138.589C144.497 89.3125 149.25 94.0773 149.25 100C149.25 105.923 144.497 110.688 138.589 110.688H110.161V139.188C110.161 145.11 105.408 149.875 99.5 149.875C93.5922 149.875 88.8393 145.11 88.8393 139.188Z"
                fill="white"
                fillOpacity="0.33"
              />
            </svg>
          </div>
          <div className={styles.limeBg}>
            <div className={styles.sectionTitle}>Recent games</div>
            <div className={styles.gamesList}>
              {games.map((game) => (
                <div
                  key={game.id}
                  className={styles.gameItem}
                  onClick={() => handleGameClick(game)}
                >
                  {game.name}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={`${styles.right} ${styles.limeBg}`}>
          <div className={styles.tabs}>
            <button
              className={`${styles.tabButton} ${
                activeTab === "myGames" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("myGames")}
            >
              My games
            </button>
            <button
              className={`${styles.tabButton} ${
                activeTab === "examples" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("examples")}
            >
              Examples
            </button>
          </div>
          <div className={styles.gamesList}>
            {activeTab === "myGames" && games.length > 0 ? (
              games.map((game) => (
                <div
                  key={game.id}
                  className={styles.gameItem}
                  onClick={() => handleGameClick(game)}
                >
                  {game.name}
                </div>
              ))
            ) : (
              <div>No games found.</div>
            )}
          </div>
        </div>
      </div>
      {showModePopup && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Select Mode</h2>
            <button onClick={() => handleModeSelect("new")}>New Game</button>
            <button onClick={() => handleModeSelect("load")}>Load Game</button>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSelection;
