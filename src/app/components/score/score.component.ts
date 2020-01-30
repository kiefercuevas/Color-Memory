import { Component, OnInit, Input, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent implements OnInit {

  @Input() score:number;
  @Input() highScore:number;
  @Input() level:number;
  @Input() waitForStart:boolean;
  @Input() disableStarButton:boolean;
  @Output() startGameEvent = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  startGame(){
    this.startGameEvent.emit();
  }

}
