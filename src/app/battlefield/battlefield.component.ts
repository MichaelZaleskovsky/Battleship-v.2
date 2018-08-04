import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {BattleService} from '../model/battle.model';
import {Point} from '../model/ship.model';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent implements OnInit, OnChanges {
  battle: BattleService;
  shootBlock = false;
  gameOver = false;
  restricted: Point[];

  @Input()
  my: boolean;

  @Input()
  shoot: Point;

  @Output()
  shooter: EventEmitter<Point> = new EventEmitter();

  @Output()
  mover: EventEmitter<string> = new EventEmitter();

  @Output()
  winer: EventEmitter<boolean> = new EventEmitter();

  constructor() {
    this.battle = new BattleService();
    this.battle.generate();
  }

  ngOnChanges(change: SimpleChanges): void {
    if (!this.my || change.shoot.firstChange ) {return; }
    let x;
    let y;

    do {
      x = this.battle.numRandom(10);
      y = this.battle.numRandom(10);
    } while (Point.pointIn(new Point(x, y), this.restricted));

    this.clickShot(x, y);
  }

  ngOnInit() {
    this.restricted = [];
  }

  generate() {
  }

  setBorder(cell, y, x): string {
    let result = '';
    if (cell === 2) {
      result += ' sunk';
    }
    if (x === this.battle.shoot.x && y === this.battle.shoot.y) {
      result += ' shot';
    }
    if (cell === 0 || !this.my) {
      result = 'empty ' + result;
    } else {
      if (x === 0 || this.battle.map[y][x - 1] === 0) {
        result += ' bl';
      }
      if (x === 9 || this.battle.map[y][x + 1] === 0) {
        result += ' br';
      }
      if (y === 0 || this.battle.map[y - 1][x] === 0) {
        result += ' bt';
      }
      if (y === 9 || this.battle.map[y + 1][x] === 0) {
        result += ' bb';
      }
      result = this.innerBorder(result);
    }
    return result;
  }

  innerBorder(result: string) {
    let res = result;

    if (result.indexOf('bt') === -1) {
      res += ' noTop';
    }
    if (result.indexOf('bb') === -1) {
      res += ' noBottom';
    }
    if (result.indexOf('br') === -1) {
      res += ' noRight';
    }
    if (result.indexOf('bl') === -1) {
      res += ' noLeft';
    }

    return res;
  }

  clickShot(x, y) {
    if (this.gameOver || this.shootBlock) {return; }
    this.restricted = this.restricted.concat(this.battle.toShoot(new Point(x, y)));
    if (this.battle.shipAlive === 0) {
      this.gameOver = true;
      this.winer.emit(this.my);
      return;
    }
    if (!this.my) {
      this.shootBlock = true;
      setTimeout(
        () => {
          this.mover.emit('my');
          this.shootBlock = false;
          this.shooter.emit(new Point(x, y));
        }, 1000
      );
    } else {
      setTimeout(
        () => {this.mover.emit('your'); },
        1000
      );
    }
  }
}
