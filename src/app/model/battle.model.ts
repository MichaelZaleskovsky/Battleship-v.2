import {IShip, DotShip, LShip, Point, Ship} from './ship.model';

export class BattleService {
  map: number[][];
  fleet: Ship[];
  shipAlive = 0;
  shoot = {
    x: -1,
    y: -1
  };

  constructor() {
    this.clearMap();
  }

  /* Method to serve shoot and check is shot hit the ship
  * parameters: x, y - coordinates of shoot, should be from 0 to 9
  * return: false if all ships are sunk and true otherwise
 */
  toShoot(point: Point): Point[] {
    const shipNum = this.checkShip(point.x, point.y);
    this.shoot.x = point.x;
    this.shoot.y = point.y;
    setTimeout(() => {
      this.shoot.x = -1;
      this.shoot.y = -1;

    }, 1500);
    if (shipNum >= 0) {
      this.shipSink(shipNum);
      return this.fleet[shipNum].margin;
    }
    return [point];
  }

  /* Method to generate battle field, fleet and random place ships on field
  *  no parameters, no return
 */
  generate() {
    while (true) {
      this.shipAlive = 0;
      this.clearMap();

      if (!this.generateShip(new IShip())) {
        continue;
      }
      if (!this.generateShip(new LShip())) {
        continue;
      }
      if (!this.generateShip(new DotShip())) {
        continue;
      }
      if (!this.generateShip(new DotShip())) {
        continue;
      }
      if (!this.generateShip(new DotShip())) {
        continue;
      }
      break;
    }
  }

  private shipSink(shipNum: number) {
    this.fleet[shipNum].sunk = true;
    this.fleet[shipNum].body.forEach(
      (point) => {
        this.map[point.y][point.x] = 2;
      }
    );
    this.shipAlive--;
  }

  private checkShip(x: number, y: number): number {
    for (const i in this.fleet) {
      if (Point.pointIn(new Point(x, y), this.fleet[i].body) && !this.fleet[i].sunk) {
        return +i;
      }
    }
    return -1;
  }

  private clearMap() {
    this.fleet = [];
    this.map = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

  }

  private generateShip(ship: Ship) {
    let ii = 1;
    do {

      ship.generate(new Point(this.numRandom(10), this.numRandom(10)), this.numRandom(4), this.numRandom(2));
    } while (!this.validate(ship) && ii++ < 50);
    if (ii >= 50) {
      return false;
    }
    ship.setMargin();
    this.place(ship);
    this.shipAlive++;
    return true;
  }

  private validate(ship: Ship): boolean {
    for (const p2 of ship.body) {
      if (p2.x < 0 || p2.x > 9 || p2.y < 0 || p2.y > 9) { return false; }
      for (const s of this.fleet) {
        for (const p1 of s.margin) {
          if (p1.equals(p2)) {
            return false;
          }
        }
      }
    }
    return true;
  }

  numRandom(num: number): number {
    return Math.floor(Math.random() * num);
  }

  private place (ship: Ship) {
    this.fleet.push(ship);
    ship.body.forEach(
      (point) => {
        this.map[point.y][point.x] = 1;
      }
    );
  }
}

