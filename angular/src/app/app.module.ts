import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RollerComponent } from './roller/roller.component';
import { ParentBlockComponent } from './parent-block/parent-block.component';
import { LitterComponent } from './litter/litter.component';
import { SupplementsComponent } from './supplements/supplements.component';
import { RollerOptionsComponent } from './roller-options/roller-options.component';
import {MDBBootstrapModulesPro, MDBSpinningPreloader} from 'ng-uikit-pro-standard';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    RollerComponent,
    ParentBlockComponent,
    LitterComponent,
    SupplementsComponent,
    RollerOptionsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModulesPro.forRoot(),
  ],
  providers: [
    MDBSpinningPreloader
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
