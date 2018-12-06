import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WeeklySummaryPage } from './weekly-summary';

@NgModule({
  declarations: [
    WeeklySummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(WeeklySummaryPage),
  ],
})
export class WeeklySummaryPageModule {}
