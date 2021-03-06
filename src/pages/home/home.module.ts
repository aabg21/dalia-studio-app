import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {HomePage} from './home';
import {ActionRendererComponent} from './action-renderer/action-renderer';
import {EmptyMealActionComponent} from './action-renderer/empty-meal-action/empty-meal-action';
import {InsightsAvailableActionComponent} from './action-renderer/insights-available-action/insights-available-action';
import {ActivityRendererComponent} from './activity-renderer/activity-renderer';
import {FoodActivityComponent} from './activity-renderer/food-activity/food-activity';
import {SportActivityComponent} from './activity-renderer/sport-activity/sport-activity';
import {WeightActivityComponent} from './activity-renderer/weight-activity/weight-activity';
import {TotalRendererComponent} from "./total-renderer/total-renderer";
import {ComponentsModule} from "../../components/components.module";

@NgModule({
  declarations: [
    HomePage,
    ActionRendererComponent,
    EmptyMealActionComponent,
    InsightsAvailableActionComponent,
    ActivityRendererComponent,
    FoodActivityComponent,
    SportActivityComponent,
    WeightActivityComponent,
    TotalRendererComponent
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    ComponentsModule
  ],
  exports: [
    HomePage
  ],
})
export class HomePageModule {}
