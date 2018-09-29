import { Component } from '@angular/core';

import {NavParams, ViewController} from 'ionic-angular';
import { Activity } from '../../providers/activity/activity';
import {isSportActivity, SportActivity} from '../../providers/activity/sport-activity';
import {FoodActivity, isFoodActivity} from '../../providers/activity/food-activity';
import {PredefinedSportActivity} from '../../providers/predefined-activity/predefined-sport-activity';
import {PredefinedFoodActivity} from '../../providers/predefined-activity/predefined-food-activity';
import {ActivityStorageProvider} from '../../providers/activity/activity-storage-provider';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  private activity: PredefinedSportActivity|PredefinedFoodActivity;
  private isEdit: boolean;

  public model: SportActivity|FoodActivity;
  public title: string;
  public type: string;
  public isoDate: string;

  constructor(
    private viewCtrl: ViewController,
    navParams: NavParams,
    private activityStorage: ActivityStorageProvider
  ) {
    const activity: Activity = navParams.get('activity');

    this.isEdit = navParams.get('isEdit');

    if (isSportActivity(activity)) {
      this.activity = <PredefinedSportActivity>activity;
      this.model = new SportActivity(activity.name, null, new Date(), null, '');
      this.title = activity.name;
      this.type = 'SPORT';
    } else if (isFoodActivity(activity)) {
      this.activity = <PredefinedFoodActivity>activity;
      this.model = new FoodActivity(activity.item, activity.category, new Date(), 1, activity.calories, '');
      this.title = activity.item;
      this.type = 'FOOD';
    }

    Object.assign(this.model, activity);

    this.isoDate = new Date(this.model.time.getTime() - (this.model.time.getTimezoneOffset() * 60000)).toISOString();
  }

  private getMultiply(): number {
    if (isSportActivity(this.model)) {
      return this.model.duration / 60;
    } else if (isFoodActivity(this.model)) {
      return this.model.amount;
    }
  }

  public setCalories(event: UIEvent) {
    if (this.activity.calories) {
      this.model.calories = Math.round(this.activity.calories * this.getMultiply());
    }
  }

  private isValidNumber(number: string|number) {
    number = parseFloat('' + number);
    return !!number && !isNaN(number);
  }

  public isInvalid() {
    if (isSportActivity(this.model) && !this.isValidNumber(this.model.duration)) {
      return true;
    } else if (isFoodActivity(this.model) && !this.isValidNumber(this.model.amount)) {
      return true;
    }

    return !this.isValidNumber(this.model.calories);
  }

  public save() {
    const isoDate = new Date(this.isoDate);

    this.model.time = new Date(isoDate.getTime() + (isoDate.getTimezoneOffset() * 60000));

    if (isSportActivity(this.model) && typeof this.model.duration !== 'number') {
      this.model.duration = parseFloat('' + this.model.duration);
    } else if (isFoodActivity(this.model) && typeof this.model.amount !== 'number') {
      this.model.amount = parseFloat('' + this.model.amount);
    }

    if (typeof this.model.calories !== 'number') {
      this.model.calories = parseInt('' + this.model.calories, 10);
    }

    if (this.isEdit) {
      Object.assign(this.activity, this.model);
      this.activityStorage.save();
    } else {
      this.activityStorage.addActivities(this.model);
    }

    this.viewCtrl.dismiss(true);
  }

  public dismiss() {
    this.viewCtrl.dismiss(false);
  }
}
