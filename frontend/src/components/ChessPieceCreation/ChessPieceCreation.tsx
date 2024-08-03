import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameset } from "../../GamesetContext";
import PieceCard from "../PieceCard/PieceCard";
import styles from "./ChessPieceCreation.module.css";
import ChessPiece, { OptionalProperties } from "../../classes/ChessPiece";

const optionalPropertyDescriptions: { [key: string]: string } = {
  "!": "Most important piece of the game",
  x: "When captured, kills the opponent's piece",
  n: "Can change direction during the move",
  y: "Moves other pieces when making a move (as though they flee)",
  d: "Lives in others (gets another 'body' when captures)",
  l: "Moves other pieces when making a move (as though they follow him)",
  f: "Combining two or more pieces into a single, more powerful entity",
  s: "Doesn't move when capturing others",
  c: "Clones on each move",
  g: "Can gather on one cell in quantities more than 1",
  "+": "Can spawn other pieces",
  p: "Can promote to another piece after reaching the end of the board",
  v: "Invisible on the board",
  e: "Explodes when captured",
  i: "After capture makes another move",
  u: "Cannot be captured",
  "?": "Can change itself into another piece during the move",
  r: "Kills other pieces when approaches them",
  o: "Can change other pieces into another piece during the move",
  t: "Undoes opponent's moves in the area where he goes",
  a: "Learns new moves from others",
};

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

  const handleCheckboxChange = (property: keyof OptionalProperties) => {
    if (activePiece) {
      const updatedPiece = new ChessPiece({
        ...activePiece,
        optional: {
          ...activePiece.optional,
          [property]: !activePiece.optional[property],
        },
      });
      setActivePiece(updatedPiece);
    }
  };

  const handleCellClick = (row: number, col: number) => {
    if (activePiece) {
      const move = { x: col - 3, y: 3 - row, m: true, c: true };
      const moves = activePiece.moves || [];
      const moveIndex = moves.findIndex(
        (m) => m.x === move.x && m.y === move.y
      );

      const updatedMoves =
        moveIndex === -1
          ? [...moves, move]
          : moves.filter((_, index) => index !== moveIndex);

      const updatedPiece = new ChessPiece({
        ...activePiece,
        moves: updatedMoves,
      });
      setActivePiece(updatedPiece);
    }
  };

  const handlePrintPiece = () => {
    if (activePiece) {
      console.log(activePiece);
    }
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
                  <div className={styles.labelAndInput}>
                    <label htmlFor="piece-name">Name: </label>
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
                  </div>
                  <div className={styles.labelAndInput}>
                    <label htmlFor="piece-symbol">Symbol: </label>
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
                  </div>
                  <div className={styles.labelAndInput}>
                    <label htmlFor="piece-spm">Steps/move: </label>
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
                </div>
                <div className={styles.optionalProperties}>
                  {Object.keys(optionalPropertyDescriptions).map((property) => (
                    <div key={property} className={styles.checkboxContainer}>
                      <input
                        type="checkbox"
                        id={`checkbox-${property}`}
                        checked={
                          !!activePiece.optional[
                            property as keyof OptionalProperties
                          ]
                        }
                        onChange={() =>
                          handleCheckboxChange(
                            property as keyof OptionalProperties
                          )
                        }
                      />
                      <label
                        htmlFor={`checkbox-${property}`}
                        className={styles.checkboxLabel}
                        title={optionalPropertyDescriptions[property]}
                      >
                        {property}
                      </label>
                    </div>
                  ))}
                </div>
                <div className={styles.defineMoves}>
                  <h3>Define the moves</h3>
                  <table className={styles.movesTable}>
                    <tbody>
                      {Array.from({ length: 7 }).map((_, row) => (
                        <tr key={row}>
                          {Array.from({ length: 7 }).map((_, col) => (
                            <td
                              key={col}
                              className={
                                row === 3 && col === 3
                                  ? styles.centralCell
                                  : activePiece.moves.some(
                                      (move) =>
                                        move.x === col - 3 && move.y === 3 - row
                                    )
                                  ? styles.activeCell
                                  : styles.inactiveCell
                              }
                              onClick={() => handleCellClick(row, col)}
                            >
                              {row === 3 && col === 3 && (
                                <div className={styles.centralDot}></div>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={styles.buttonsColumn}>
                  <button className={styles.button}>Add</button>
                  <button className={styles.button}>Save</button>
                  <button className={styles.button}>Duplicate</button>
                  <button className={styles.button}>Trash</button>
                  <button className={styles.button} onClick={handlePrintPiece}>
                    Print
                  </button>
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
            xmlns="<http://www.w3.org/2000/svg>"
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
            xmlns="<http://www.w3.org/2000/svg>"
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
