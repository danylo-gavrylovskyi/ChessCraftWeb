import ChessBoard from "./ChessBoard";
import ChessPiece from "./ChessPiece";
import PieceMapping from "./PieceMapping";

interface GamesetConfig {
  pieces: any[];
  board: any;
  white_coefficients: [number, number, number, number];
  black_coefficients: [number, number, number, number];
}

export class Gameset {
  pieces: ChessPiece[];
  board: ChessBoard;
  pieceMapping: PieceMapping;
  whiteCoefficients: [number, number, number, number];
  blackCoefficients: [number, number, number, number];

  constructor(config: GamesetConfig) {
    this.pieces = config.pieces.map((piece) => ChessPiece.fromJSON(piece));
    this.board = ChessBoard.fromJSON(config.board);
    this.pieceMapping = new PieceMapping();
    this.pieceMapping.addAllPieces(this.pieces);
    this.whiteCoefficients = config.white_coefficients;
    this.blackCoefficients = config.black_coefficients;
  }

  toJSON() {
    return {
      pieces: this.pieces.map((piece) => piece.toJSON()),
      board: this.board.toJSON(),
      white_coefficients: this.whiteCoefficients,
      black_coefficients: this.blackCoefficients,
    };
  }
}
