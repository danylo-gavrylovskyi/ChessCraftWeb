class ChessBoardPiece {
    piece: string;
    color: string;

    constructor(data: { piece: string; color: string }) {
        this.piece = data.piece;
        this.color = data.color;
    }

    toJSON() {
        return {
            piece: this.piece,
            color: this.color,
        };
    }
}

export default ChessBoardPiece;
