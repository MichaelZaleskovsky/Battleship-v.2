export class Ship {
  dx: number;
  dy: number;
  body: Point[];
  margin: Point[];
  sunk = false;

  constructor () {
    this.body = [];
    this.margin = [];
  }

  generate(start: Point, direction?: number, angle?: number) {}

  setDir(direction) {
    switch (direction) {
      case 0: {
        this.dx = -1;
        this.dy = 0;
        break;
      }
      case 1: {
        this.dx = 1;
        this.dy = 0;
        break;
      }
      case 2: {
        this.dx = 0;
        this.dy = 1;
        break;
      }
      case 3: {
        this.dx = 0;
        this.dy = -1;
        break;
      }
    }
  }

  fleetCollision (shipPoint: Point, fleet: Ship[]): boolean {
    let ship: Ship;
    let point: Point;
    for (ship of fleet) {

      for (point of ship.margin) {
        if (shipPoint.equals(point)) { return true; }
      }

    }
    return false;
  }

  setMargin() {
    this.body.forEach(
      (point) => {
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++ ) {
            const newPoint = new Point(point.x + dx, point.y + dy);
            if (!Point.pointIn(newPoint, this.margin)) {this.margin.push(newPoint); }
          }
        }
      }
    );
  }

}

export class IShip extends Ship {
  constructor() {
    super();
  }
  generate(start: Point, direction?: number, angle?: number) {
    this.setDir(direction);
    this.body = [];
    for (let i = 0; i < 4; i++) {
      this.body.push(start);
      start = new Point (start.x + this.dx, start.y + this.dy);
    }
  }
}

export class LShip extends Ship {
  constructor() {
    super();
  }
  generate(start: Point, direction?: number, angle?: number) {
    this.setDir(direction);
    this.body = [];
    for (let i = 0; i < 3; i++) {
      this.body.push(start);
      start = new Point (start.x + this.dx, start.y + this.dy);
    }
    if (angle === 0) {angle = -1; }
    this.body.push(new Point (start.x - this.dx + this.dy * angle, start.y - this.dy + this.dx * angle));
  }
}

export class DotShip extends Ship {
  constructor() {
    super();
  }
  generate(start: Point, direction?: number, angle?: number) {
    this.body = [];
    this.body.push(start);
  }
}

export class Point {

  x: number;
  y: number;

  static pointIn(point: Point, arr: Point[]): boolean {
    for (const p of arr) {
      if (point.equals(p)) {return true; }
    }
    return false;
  }

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  equals (op: Point): boolean {
    return this.x === op.x && this.y === op.y;
  }

}
