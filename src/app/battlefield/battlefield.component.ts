import { Component, OnInit } from '@angular/core';
import {BattleService} from '../battle.service';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.css']
})
export class BattlefieldComponent implements OnInit {

  constructor(private battle: BattleService) {
  }

  ngOnInit() {
  }

  generate() {
    this.battle.generate();
  }

  setBorder(cell, y, x): string {
    let result = '';
    if (cell === 2) {
      result += ' sunk';
    }
    if (x === this.battle.shoot.x && y === this.battle.shoot.y) {
      result += ' shot';
    }
    if (cell === 0) {
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
    }
    return result;
  }

}
