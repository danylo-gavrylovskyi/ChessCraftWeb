import React from 'react';
import { ChessPieceItem } from '../utils/chess';
import { chessPieces } from '../utils/chessPieces';

const ChessPiece: React.FC<ChessPieceItem> = ({ type, color }) => {
    const IconComponent = chessPieces[type];

    return (
        <div className={`chess-piece ${color}`}>
            <IconComponent />
        </div>
    );
};

export default ChessPiece;
