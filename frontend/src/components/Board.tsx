import React from 'react';
import '../styles/Board.css';

interface BoardProps {
    size: number;
}

const Board: React.FC<BoardProps> = ({ size }) => {
    const rows = Array.from({ length: size }, (_, i) => size - i);
    const cols = Array.from({ length: size }, (_, i) => String.fromCharCode(65 + i));

    const isBlackSquare = (row: number, col: number) => {
        return (row + col) % 2 === 1;
    };

    return (
        <div className="board">
            <div className="row-labels">
                {rows.map((row) => (
                    <span key={row} className="label">{row}</span>
                ))}
            </div>
            <div className="board-grid" style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}>
                {rows.map((row, rowIndex) => (
                    cols.map((col, colIndex) => (
                        <div
                            key={`${row}${col}`}
                            className={`cell ${isBlackSquare(rowIndex, colIndex) ? 'black' : ''}`}
                        ></div>
                    ))
                ))}
            </div>
            <div className="col-labels">
                {cols.map((col) => (
                    <span key={col} className="label">{col}</span>
                ))}
            </div>
        </div>
    );
};

export default Board;
