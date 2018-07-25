import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {BattleService} from './battle.service';
import {Point} from "./model/ship.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  gameRun;
  x = 0;
  y = 0;
  takeAim;
  element;
  private buffer: Point[];

  constructor(private battle: BattleService,
              private renderer: Renderer2) {}

  ngOnInit() {
    this.buffer = [];
    this.gameRun = true; // Game still run
    this.takeAim = false; // Manual input coordinates of shoot
    this.battle.generate();
    this.element = this.renderer.selectRootElement('#start');

    this.toFocus(); // Focus to editable div to catch keypress

    // Buffering input to have possibility to serve all pressed key
    setInterval(() => {
      this.fromBuffer();
    }, 1800);
  }

  toShoot(event) {
    this.toFocus();
    if (this.takeAim) {
      if (event instanceof MouseEvent) {
        this.toBuffer(new Point(this.x, this.y));
      }
    } else {
      this.toBuffer(new Point(this.battle.numRandom(10), this.battle.numRandom(10)));
    }
    if (this.gameRun) {
    }
  }

  toFocus() {
    setTimeout(() => this.element.focus(), 0);
  }

  toBuffer(point: Point) {
    this.buffer.push(point);
  }

  fromBuffer() {
    let point: Point;
    if (this.buffer.length > 0) {
      point = this.buffer.shift();
      if (this.gameRun) {this.gameRun = this.battle.toShoot(point); }
    }
  }
}
