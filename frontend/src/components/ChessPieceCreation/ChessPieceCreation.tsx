import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameset } from "../../GamesetContext";
import PieceCard from "../PieceCard/PieceCard";
import styles from "./ChessPieceCreation.module.css";
import ChessPiece from "../../classes/ChessPiece";

const ChessPieceCreation: React.FC = () => {
  const { activeGame } = useGameset();
  const [gamePieces, setGamePieces] = useState(activeGame?.pieces || []);
  const [activePiece, setActivePiece] = useState<ChessPiece | null>(
    gamePieces[Math.floor(Math.random() * gamePieces.length)] || null
  );

  const navigate = useNavigate();

  const handlePieceClick = (piece: ChessPiece) => {
    setActivePiece(piece);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Define the pieces</h2>
        <div className={styles.pieceList}>
          {gamePieces.map((piece, index) => (
            <PieceCard
              key={index}
              name={piece.name}
              character={piece.symbol}
              isActive={piece === activePiece}
              onClick={() => handlePieceClick(piece)}
            />
          ))}
        </div>
      </div>
      <div className={styles.middle}>
        <div className={styles.pieceEditor}>
          {activePiece ? (
            <>
              <div className={styles.pieceDetails}>
                <div className={styles.pieceInfo}>
                  <div className={styles.svgPlaceholder}>
                    <i
                      className={styles.icon}
                      style={{
                        WebkitMaskImage: `url("/assets/SVGs/${activePiece.symbol}.svg")`,
                        maskImage: `url("/assets/SVGs/${activePiece.symbol}.svg")`,
                      }}
                    />
                  </div>
                  <input
                    type="text"
                    value={activePiece.name}
                    onChange={(e) => {
                      const updatedPiece = new ChessPiece({
                        ...activePiece,
                        name: e.target.value,
                      });
                      setActivePiece(updatedPiece);
                    }}
                  />
                  <input
                    type="text"
                    value={activePiece.symbol}
                    onChange={(e) => {
                      const updatedPiece = new ChessPiece({
                        ...activePiece,
                        symbol: e.target.value,
                      });
                      setActivePiece(updatedPiece);
                    }}
                  />
                  <input
                    type="number"
                    value={activePiece.maxSteps}
                    onChange={(e) => {
                      const updatedPiece = new ChessPiece({
                        ...activePiece,
                        maxSteps: Number(e.target.value),
                      });
                      setActivePiece(updatedPiece);
                    }}
                  />
                </div>
                <div className={styles.optionalProperties}>
                  {/* Add the grid of checkboxes here */}
                </div>
                <div className={styles.defineMoves}>
                  <h3>Define the moves</h3>
                  {/* Add the 7x7 grid here */}
                </div>
                <div className={styles.buttonsColumn}>
                  <button>Add</button>
                  <button>Save</button>
                  <button>Duplicate</button>
                  <button>Trash</button>
                </div>
              </div>
            </>
          ) : (
            <div>Select a piece to edit</div>
          )}
        </div>
      </div>
      <div className={styles.footer}>
        <button
          className={styles.button}
          onClick={() => navigate("/board-dimensions")}
        >
          <svg
            width="20%"
            viewBox="0 0 28 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1.35864 27.2664C-0.447998 25.4598 -0.447998 22.5258 1.35864 20.7192L19.8586 2.21915C21.1883 0.889464 23.1684 0.49923 24.9028 1.22189C26.6372 1.94454 27.7645 3.6211 27.7645 5.50001V42.5C27.7645 44.3645 26.6372 46.0555 24.9028 46.7781C23.1684 47.5008 21.1883 47.0961 19.8586 45.7809L1.35864 27.2809V27.2664Z"
              fill="#FFD955"
            />
          </svg>
          Prev
        </button>
        <button
          className={styles.button}
          onClick={() => navigate("/chess-piece-creation")}
        >
          Next{" "}
          <svg
            width="20%"
            viewBox="0 0 28 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.6415 27.2664C28.4481 25.4598 28.4481 22.5258 26.6415 20.7191L8.1415 2.21915C6.81182 0.889464 4.83174 0.49923 3.09736 1.22189C1.36299 1.94454 0.235641 3.6211 0.235641 5.50001V42.5C0.235641 44.3645 1.36299 46.0555 3.09736 46.7781C4.83174 47.5008 6.81182 47.0961 8.1415 45.7809L26.6415 27.2809V27.2664Z"
              fill="#FFD955"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChessPieceCreation;
