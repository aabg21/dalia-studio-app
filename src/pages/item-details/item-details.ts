import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { Activity } from '../../providers/activity/activity';
import {isSportActivity} from '../../providers/activity/sport-activity';
import {isFoodActivity} from '../../providers/activity/food-activity';
import {PredefinedSportActivity} from '../../providers/predefined-activity/predefined-sport-activity';
import {PredefinedFoodActivity} from '../../providers/predefined-activity/predefined-food-activity';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  public activity: Activity;
  public title: string;
  public type: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    const activity: Activity = navParams.get('activity');

    if (isSportActivity(activity)) {
      this.activity = <PredefinedSportActivity>activity;
      this.title = activity.name;
      this.type = 'SPORT';
    } else if (isFoodActivity(activity)) {
      this.activity = <PredefinedFoodActivity>activity;
      this.title = activity.item;
      this.type = 'FOOD';
    }
  }
}
