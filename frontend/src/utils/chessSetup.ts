import { ChessPieceItem, ChessPieceType, ChessPieceColor } from './chess';

type PieceSetup = [ChessPieceType, number];

const setupConfig: Record<number, PieceSetup[]> = {
    4: [['pawn', 4]],
    8: [['rook', 1], ['knight', 1], ['bishop', 1], ['queen', 1], ['king', 1], ['bishop', 1], ['knight', 1], ['rook', 1]],
    9: [['rook', 1], ['knight', 1], ['bishop', 1], ['queen', 1], ['king', 1], ['queen', 1], ['bishop', 1], ['knight', 1], ['rook', 1]],
    15: [['rook', 2], ['knight', 2], ['bishop', 2], ['queen', 1], ['king', 1], ['queen', 1], ['bishop', 2], ['knight', 2], ['rook', 2]]
};

function setupRow(board: (ChessPieceItem | null)[][], row: number, pieces: PieceSetup[], color: ChessPieceColor) {
    let col = 0;
    for (const [type, count] of pieces) {
        for (let i = 0; i < count; i++) {
            board[row][col] = { type, color };
            col++;
        }
    }
}

export function getInitialChessPieces(size: number): (ChessPieceItem | null)[][] {
    const board: (ChessPieceItem | null)[][] = Array(size).fill(null).map(() => Array(size).fill(null));
    const config = setupConfig[size];

    setupRow(board, 0, config, 'yellow');
    setupRow(board, size - 1, config, 'white');

    if (size > 4) {
        setupRow(board, 1, [['pawn', size]], 'yellow');
        setupRow(board, size - 2, [['pawn', size]], 'white');
    }

    return board;
}
