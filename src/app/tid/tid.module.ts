import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TidPageRoutingModule } from './tid-routing.module';

import { TidPage } from './tid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TidPageRoutingModule
  ],
  declarations: [TidPage]
})
export class TidPageModule {}
