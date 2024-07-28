import ChessBoardPiece from "./ChessBoardPiece";

class ChessBoard {
  rows: number;
  columns: number;
  board: (ChessBoardPiece | null)[][];

  constructor(
    rows: number,
    columns: number,
    board: (ChessBoardPiece | null)[][] | null = null
  ) {
    this.rows = rows;
    this.columns = columns;
    this.board =
      board || Array.from({ length: rows }, () => Array(columns).fill(null));
  }

  toJSON() {
    return {
      rows: this.rows,
      columns: this.columns,
      board: this.board.map((row) =>
        row.map((piece) => (piece ? piece.toJSON() : null))
      ),
    };
  }

  static fromJSON(data: {
    rows: number;
    columns: number;
    board: any[][];
  }): ChessBoard {
    const boardData = data.board.map((row) =>
      row.map((pieceData) =>
        pieceData ? ChessBoardPiece.fromJSON(pieceData) : null
      )
    );
    return new ChessBoard(data.rows, data.columns, boardData);
  }
}

export default ChessBoard;
