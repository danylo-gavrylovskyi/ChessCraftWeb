import React from "react";
import { useGameset } from "../../GamesetContext";
import styles from "./Board.module.css";
import { useNavigate } from "react-router-dom";

const Board: React.FC = () => {
    const { activeGame } = useGameset();
    const navigate = useNavigate();

    if (!activeGame) {
        navigate("/");
        return null;
    }

    const { board, rows, columns } = activeGame.board;

    const isBlackSquare = (row: number, col: number) => {
        return (row + col) % 2 === 1;
    };

    const rowsArray = Array.from({ length: rows }, (_, i) => i);
    const colsArray = Array.from({ length: columns }, (_, i) => i);

    return (
        <div className={styles.board}>
            <div className={styles.rowLabels}>
                {rowsArray.map((row) => (
                    <span key={row} className={styles.label}>
                        {row}
                    </span>
                ))}
            </div>
            <div
                className={styles.boardGrid}
                style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
            >
                {rowsArray.map((rowIndex) =>
                    colsArray.map((colIndex) => {
                        const piece = board[rowIndex][colIndex];

                        return (
                            <div
                                key={`${rowIndex}-${colIndex}`}
                                className={`${styles.cell} ${
                                    isBlackSquare(rowIndex, colIndex)
                                        ? styles.black
                                        : ""
                                }`}
                            >
                                {piece && (
                                    <i
                                        className={`${styles.cellPiece} ${
                                            piece.color === "b"
                                                ? styles.b
                                                : styles.w
                                        }`}
                                        style={{
                                            WebkitMaskImage: `url("/assets/SVGs/${piece.piece}.svg")`,
                                            maskImage: `url("/assets/SVGs/${piece.piece}.svg")`,
                                        }}
                                    />
                                )}
                            </div>
                        );
                    })
                )}
            </div>
            <div className={styles.colLabels}>
                {colsArray.map((col) => (
                    <span key={col} className={styles.label}>
                        {col}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default Board;
