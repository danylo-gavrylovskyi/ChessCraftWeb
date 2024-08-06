class Move {
  x: number;
  y: number;
  moving: boolean;
  capturing: boolean;

  constructor(json: { x: number; y: number; m: boolean; c: boolean }) {
    this.x = json.x;
    this.y = json.y;
    this.moving = json.m;
    this.capturing = json.c;
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
      m: this.moving,
      c: this.capturing,
    };
  }

  static fromJSON(json: {
    x: number;
    y: number;
    m: boolean;
    c: boolean;
  }): Move {
    return new Move(json);
  }
}

export default Move;
