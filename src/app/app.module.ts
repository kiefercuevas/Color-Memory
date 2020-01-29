import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainBoardComponent } from './components/main-board/main-board.component';
import { ColorComponent } from './components/color/color.component';
import { ScoreComponent } from './components/score/score.component';

@NgModule({
  declarations: [
    AppComponent,
    MainBoardComponent,
    ColorComponent,
    ScoreComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
