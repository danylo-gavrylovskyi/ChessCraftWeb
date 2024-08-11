import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameset } from "../../GamesetContext";
import PieceCard from "../PieceCard/PieceCard";
import styles from "./PlacePieces.module.css";
import { Gameset } from "../../classes/Gameset";
import ChessBoardPiece from "../../classes/ChessBoardPiece";

const PlacePieces: React.FC = () => {
    const { activeGame, setActiveGame } = useGameset();

    const [selectedPiece, setSelectedPiece] = useState<ChessBoardPiece | null>(
        null
    );
    const boardArray =
        activeGame?.board.board ||
        Array(activeGame?.board.rows ?? 8).fill(
            Array(activeGame?.board.columns ?? 8).fill(null)
        );
    const [board, setBoard] =
        useState<(ChessBoardPiece | null)[][]>(boardArray);
    const navigate = useNavigate();

    const handlePieceClick = (piece: string) => {
        setSelectedPiece(
            new ChessBoardPiece({ piece: piece, color: "unknown" })
        );
    };

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        if (board[rowIndex][colIndex]) {
            // Remove the piece from the cell if clicked
            const newBoard = board.map((row, rIndex) =>
                row.map((cell, cIndex) =>
                    rIndex === rowIndex && cIndex === colIndex ? null : cell
                )
            );
            setBoard(newBoard);
            updateActiveGame(newBoard);
        } else if (selectedPiece) {
            const maxRow = activeGame?.board.rows ?? 0;
            const color = rowIndex >= maxRow / 2 ? "w" : "b";
            selectedPiece.color = color;
            const newBoard = board.map((row, rIndex) =>
                row.map((cell, cIndex) => {
                    return rIndex === rowIndex && cIndex === colIndex
                        ? selectedPiece
                        : cell;
                })
            );
            setSelectedPiece(new ChessBoardPiece(selectedPiece));
            setBoard(newBoard);
            updateActiveGame(newBoard);
        }
    };

    const updateActiveGame = (newBoard: (ChessBoardPiece | null)[][]) => {
        if (activeGame) {
            const updatedGame = new Gameset({
                ...activeGame,
                board: {
                    ...activeGame.board,
                    board: newBoard,
                },
            });
            setActiveGame(updatedGame);
        }
    };

    if (!activeGame) {
        navigate("/");
        return null;
    }
    const gamePieces = activeGame.pieces;

    return (
        <div className={styles.container}>
            <div className={styles.header}>Place the pieces on the board</div>
            <div className={styles.content}>
                <div className={styles.instructions}>
                    <p>Click on the piece, then on the square</p>
                    <div className={styles.pieces}>
                        {gamePieces.map((piece, index) => (
                            <PieceCard
                                key={index}
                                name={piece.name}
                                character={piece.symbol}
                                isActive={selectedPiece?.piece === piece.symbol}
                                backgroundColor="#566F10"
                                onClick={() => handlePieceClick(piece.symbol)}
                            />
                        ))}
                    </div>
                </div>
                <div
                    className={styles.board}
                    style={{
                        gridTemplateColumns: `repeat(${activeGame.board.columns}, 1fr)`,
                        gridTemplateRows: `repeat(${activeGame.board.rows}, 1fr)`,
                    }}
                >
                    {board.map((row, rowIndex) => (
                        <div key={rowIndex} className={styles.row}>
                            {row.map((cell, colIndex) => (
                                <div
                                    key={colIndex}
                                    className={styles.cell}
                                    onClick={() =>
                                        handleCellClick(rowIndex, colIndex)
                                    }
                                >
                                    {cell && (
                                        <i
                                            className={`${styles.cellPiece} ${
                                                cell.color === "b"
                                                    ? styles.b
                                                    : styles.w
                                            }`}
                                            style={{
                                                WebkitMaskImage: `url("/assets/SVGs/${cell.piece}.svg")`,
                                                maskImage: `url("/assets/SVGs/${cell.piece}.svg")`,
                                            }}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.buttons}>
                <button
                    className={styles.button}
                    onClick={() => navigate("/chess-piece-creation")}
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
                    onClick={() => navigate("/play")}
                >
                    Next
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

export default PlacePieces;
