export type ChessPieceType = 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
export type ChessPieceColor = 'white' | 'yellow';

export interface ChessPieceItem {
    type: ChessPieceType;
    color: ChessPieceColor;
}
