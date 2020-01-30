import { Component, OnInit, Input, Output } from '@angular/core';
import { Color } from 'src/app/models/color';
import { EventEmitter } from '@angular/core';
import { wait } from 'src/app/helpers/wait';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  @Input() color:Color;
  @Input() disableClick:boolean;
  @Input() velocity:number;
  @Output() sendColorId = new EventEmitter<number>();
  

  _state:boolean;
  hoverStyles:object;
  styles:object;
  

  @Input('state')
  set state(value:boolean){
    this.changeBoxColor();
  } 

  constructor() { 
    this.disableClick = false;
  }

  ngOnInit() {}

  sendId(){
    this.sendColorId.emit(this.color.id);
  }

  doNothing(){};

  async changeBoxColor(){
    await wait(this.velocity);
    this.color.state = false;
  }


}
