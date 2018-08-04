import {Component, OnInit} from '@angular/core';
import {Point} from './model/ship.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  gameRun;
  shoot: Point;
  move = 'your';
  myWin = '';

  constructor() {}

  ngOnInit() {
    this.gameRun = true; // Game still run
  }

  gameOver(event) {
    setTimeout( () => {
      this.myWin = event;
      this.gameRun = false;
      this.move = '';
      }, 0);
  }

  toShoot(event) {
    this.shoot = event;
  }

}
