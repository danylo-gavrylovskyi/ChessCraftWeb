class ChessBoardPiece {
  piece: string;
  color: string;

  constructor(piece: string, color: string) {
    this.piece = piece;
    this.color = color;
  }

  toJSON() {
    return {
      p: this.piece,
      c: this.color,
    };
  }

  static fromJSON(data: { p: string; c: string }): ChessBoardPiece {
    return new ChessBoardPiece(data.p, data.c);
  }
}

export default ChessBoardPiece;
