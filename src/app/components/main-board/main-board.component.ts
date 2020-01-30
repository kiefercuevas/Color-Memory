import { Component, OnInit } from '@angular/core';
import { Color } from '../../models/color';
import { colors } from '../../mocks/colors';
import { wait } from 'src/app/helpers/wait';
import { shuffleArray } from 'src/app/helpers/shuffeArray';

@Component({
  selector: 'app-main-board',
  templateUrl: './main-board.component.html',
  styleUrls: ['./main-board.component.css']
})
export class MainBoardComponent implements OnInit {

  score:number;
  highScore:number;
  increaseLevelDifficulty:boolean;
  randomColorsIds:number[];
  colors:Color[];
  amountOfColumns:number;
  percentOfSpacePerBox:string;
  boxStyles:object;
  colorOrderIndex:number;
  disableColorBoxes:boolean;
  velocity:number;
  level:number;
  amountOfIndex:number
  isStartButtonDisabled:boolean

  constructor() {

    //Set variables 
    this.randomColorsIds = [];
    this.amountOfColumns = 2;
    this.colorOrderIndex = 0;
    this.increaseLevelDifficulty = false;
    this.score = 0;
    this.highScore = 0;
    this.disableColorBoxes = false;
    this.velocity = 1000;
    this.level = 1;
    this.amountOfIndex = 4;
    this.setColumnCalculation(this.amountOfColumns);
  }

  ngOnInit() {
    //Execute
  }

  setColumnCalculation(columnAmount:number){
    const columnSizeCalculation = 1/columnAmount;
    this.boxStyles = { 'width': `calc(100% * (${columnSizeCalculation}) - 20px)`,
                             'height':`calc(100% * (${columnSizeCalculation}) - 10px)`,
                             'flex':`1 0 ${this.percentOfSpacePerBox}`,
                           }
  }

  increaseColorList(num:number = null){
    this.amountOfColumns = num == null ? this.amountOfColumns + 1 : this.amountOfColumns + num;
    this.percentOfSpacePerBox = `${(Math.round(100 / this.amountOfColumns) - 3).toString()}%`;
    
    //Take the amount of column * 2 so if we have 3 column it will bring 6 colors
    this.setColumnCalculation(this.amountOfColumns);
    this.colors = shuffleArray<Color>(colors).slice(0 , this.amountOfColumns * 2);
    this.randomColorsIds = [];

    //Bajando la velocidad para aumentar un poco la dificultad, hasta 500
    if(this.velocity > 300){
      this.velocity -= 100;
    }
  }
  
  async addRandomIndex(){
    if(this.randomColorsIds.length == this.amountOfIndex){
      this.increaseColorList();
      this.amountOfIndex++;
    }

    let colorIds = this.colors.map(c => c.id);
    let randomIndex = Math.floor(Math.random() * colorIds.length);

    this.randomColorsIds.push(colorIds[randomIndex]);
    await this.changeColorBox();
  }

  async changeColorBox(){
    this.disableColorBoxes = true;
    for(let id of this.randomColorsIds){
      let c = this.colors.find(c => c.id == id);
      c.state = true;
      while(c.state){
        await wait(this.velocity / 2);
      }
      
      await wait(100);
    }
    this.disableColorBoxes = false;
  }

  async validateClickedId(id:number){
    //Validate clicked button with colorsId in order
    if(this.randomColorsIds[this.colorOrderIndex] == id){
      this.colorOrderIndex++;

      if(this.colorOrderIndex == this.randomColorsIds.length){
        alert("Bien hecho!!");
        
        await wait(200);
        this.colorOrderIndex = 0;
        this.score += 100;
        this.level++;
        await this.addRandomIndex();
      }
    }else{
      alert("Perdiste!!!");

      await wait(200);
      this.randomColorsIds = [];
      this.colorOrderIndex = 0;
      this.highScore = this.score > this.highScore ? this.score : this.highScore;
      this.score = 0;
      this.level = 1;
      this.isStartButtonDisabled = false;
      this.resetColumns();
    }
  }

  resetColumns(){
    this.amountOfColumns = 0;
    this.increaseColorList(0);
  }

  startGame(){
    this.isStartButtonDisabled = true;
    this.amountOfColumns = 2;
    this.increaseColorList(0);
    this.addRandomIndex();
  }

}
