  import ChessBoard from "./ChessBoard";
  import ChessPiece from "./ChessPiece";
  import PieceMapping from "./PieceMapping";

  interface GamesetConfig {
    pieces: any[];
    board: any;
    whiteCoefficients: [number, number, number, number];
    blackCoefficients: [number, number, number, number];
  }

  export class Gameset {
    pieces: ChessPiece[];
    board: ChessBoard;
    pieceMapping: PieceMapping;
    whiteCoefficients: [number, number, number, number];
    blackCoefficients: [number, number, number, number];

    constructor(config: GamesetConfig) {
      this.pieces = config.pieces.map((piece) => new ChessPiece(piece));
      this.board = ChessBoard.fromJSON(config.board);
      this.pieceMapping = new PieceMapping();
      this.pieceMapping.addAllPieces(this.pieces);
      this.whiteCoefficients = config.whiteCoefficients;
      this.blackCoefficients = config.blackCoefficients;
    }

    toJSON() {
      return {
        pieces: this.pieces.map((piece) => piece.toJSON()),
        board: this.board.toJSON(),
        whiteCoefficients: this.whiteCoefficients,
        blackCoefficients: this.blackCoefficients,
      };
    }
  }
