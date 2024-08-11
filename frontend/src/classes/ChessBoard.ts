import ChessBoardPiece from "./ChessBoardPiece";

class ChessBoard {
    rows: number;
    columns: number;
    board: (ChessBoardPiece | null)[][];

    constructor(data: {
        rows: number;
        columns: number;
        board: any[][] | null;
    }) {
        this.rows = data.rows;
        this.columns = data.columns;
        if (!data.board) {
            this.board = Array.from({ length: data.rows }, () =>
                Array(data.columns).fill(null)
            );
        } else {
            this.board = data.board.map((row) =>
                row.map((pieceData) =>
                    pieceData ? new ChessBoardPiece(pieceData) : null
                )
            );
        }
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
}

export default ChessBoard;
