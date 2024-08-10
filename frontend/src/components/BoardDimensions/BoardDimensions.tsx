import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useGameset } from "../../GamesetContext";
import { Gameset } from "../../classes/Gameset";
import ChessBoard from "../../classes/ChessBoard";

import styles from "./BoardDimensions.module.css";

const BoardDimensions: React.FC = () => {
  const { activeGame, setActiveGame } = useGameset();

  const [rows, setRows] = useState(8);
  const [columns, setColumns] = useState(8);
  const navigate = useNavigate();

  if (!activeGame) {
    return <div>No active game</div>;
  }

  const handleNextPageClick = () => {
    const boardData = { rows: rows, columns: columns };
    setActiveGame(new Gameset({ ...activeGame, board: boardData }));
    navigate("/chess-piece-creation");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>Define the board dimensions</div>
      <div className={styles.content}>
        <div className={styles.controls}>
          <label>
            Rows:
            <input
              value={rows}
              onChange={(e) =>
                !parseInt(e.target.value)
                  ? setRows(0)
                  : setRows(parseInt(e.target.value))
              }
              className={styles.input}
            />
          </label>
          <label>
            Columns:
            <input
              value={columns}
              onChange={(e) =>
                !parseInt(e.target.value)
                  ? setColumns(0)
                  : setColumns(parseInt(e.target.value))
              }
              className={styles.input}
            />
          </label>
        </div>

        <div className={styles.grid}>
          {[...Array(rows)].map((_, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {[...Array(columns)].map((_, colIndex) => (
                <div key={colIndex} className={styles.cell}></div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.buttons}>
        <button className={styles.button} onClick={() => navigate("/")}>
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
        <button className={styles.button} onClick={handleNextPageClick}>
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

export default BoardDimensions;
