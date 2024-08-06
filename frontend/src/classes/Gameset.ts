import ChessBoard from "./ChessBoard";
import ChessPiece from "./ChessPiece";
import PieceMapping from "./PieceMapping";

export interface GamesetConfig {
  pieces: any[];
  board: any;
  name: string;
  white_coefficients: [number, number, number, number];
  black_coefficients: [number, number, number, number];
}

export class Gameset {
  pieces: ChessPiece[];
  board: ChessBoard;
  name: string;
  pieceMapping: PieceMapping;
  whiteCoefficients: [number, number, number, number];
  blackCoefficients: [number, number, number, number];

  constructor(config: GamesetConfig) {
    this.pieces = config.pieces.map((piece) => new ChessPiece(piece));
    this.board = ChessBoard.fromJSON(config.board);
    this.name = config.name;
    this.pieceMapping = new PieceMapping();
    this.pieceMapping.addAllPieces(this.pieces);
    this.whiteCoefficients = config.white_coefficients;
    this.blackCoefficients = config.black_coefficients;
  }

  toJSON() {
    return {
      pieces: this.pieces.map((piece) => piece.toJSON()),
      board: this.board.toJSON(),
      name: this.name,
      white_coefficients: this.whiteCoefficients,
      black_coefficients: this.blackCoefficients,
    };
  }
}
