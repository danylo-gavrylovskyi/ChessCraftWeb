import ChessPiece from "./ChessPiece";

class PieceMapping {
  private mapping: Map<string, ChessPiece>;

  constructor() {
    this.mapping = new Map<string, ChessPiece>();
  }

  addPiece(symbol: string, piece: ChessPiece): void {
    this.mapping.set(symbol, piece);
  }

  addAllPieces(pieces: ChessPiece[]): void {
    pieces.forEach((piece) => {
      this.addPiece(piece.symbol, piece);
    });
  }

  getPiece(symbol: string): ChessPiece | undefined {
    return this.mapping.get(symbol);
  }

  getMapping(): Map<string, ChessPiece> {
    return this.mapping;
  }

  toJSON() {
    const obj: { [key: string]: any } = {};
    this.mapping.forEach((piece, symbol) => {
      obj[symbol] = piece.toJSON();
    });
    return obj;
  }

  static fromJSON(data: { [key: string]: any }): PieceMapping {
    const pieceMapping = new PieceMapping();
    for (const [symbol, pieceData] of Object.entries(data)) {
      pieceMapping.addPiece(symbol, ChessPiece.fromJSON(pieceData));
    }
    return pieceMapping;
  }
}

export default PieceMapping;
