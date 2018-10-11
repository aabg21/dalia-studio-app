import { Component } from '@angular/core';

import {NavParams, ViewController} from 'ionic-angular';
import { Activity } from '../../providers/activity/activity';
import {isSportActivity, SportActivity} from '../../providers/activity/sport-activity';
import {FoodActivity, isFoodActivity} from '../../providers/activity/food-activity';
import {PredefinedSportActivity} from '../../providers/predefined-activity/predefined-sport-activity';
import {PredefinedFoodActivity} from '../../providers/predefined-activity/predefined-food-activity';
import {ActivityStorageProvider} from '../../providers/activity/activity-storage-provider';
import {FOOD_CATEGORY_NAMES, FOOD_CATEGORY_ORDER} from "../../providers/activity/food-category-enum";


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  private readonly activity: PredefinedSportActivity|PredefinedFoodActivity;
  private readonly isEdit: boolean;
  private readonly isRecent: boolean;
  private readonly activityCalories: number;

  public readonly model: SportActivity|FoodActivity;
  public readonly title: string;
  public readonly type: string;
  public readonly isoDate: string;

  public readonly foodCategories = FOOD_CATEGORY_ORDER.map(cat => ({
    value: cat,
    displayText: FOOD_CATEGORY_NAMES[cat]
  }));

  constructor(
    private viewCtrl: ViewController,
    navParams: NavParams,
    private activityStorage: ActivityStorageProvider
  ) {
    const activity: Activity = navParams.get('activity');
    this.isEdit = navParams.get('isEdit');
    this.isRecent = navParams.get('isRecent');

    if (activity && isSportActivity(activity)) {
      this.type = 'SPORT';
      this.activity = <PredefinedSportActivity>activity;
      this.model = new SportActivity();
      this.title = activity.name;
      this.activityCalories = (this.isEdit || this.isRecent) ?
        60 * activity.calories / activity.duration :
        activity.calories;

    } else {
      this.type = 'FOOD';
      this.model = new FoodActivity();

      if (activity && isFoodActivity(activity)) {
        this.activity = <PredefinedFoodActivity>activity;
        this.title = activity.item;
        this.activityCalories = (this.isEdit || this.isRecent) ?
          activity.calories / activity.amount :
          activity.calories;
      } else {
        this.title = 'מאכל אחר';
      }
    }

    if (activity) {
      Object.assign(this.model, activity);
    }

    if (!this.isEdit) {
      this.model.time = new Date();
    }

    this.isoDate = new Date(this.model.time.getTime() - (this.model.time.getTimezoneOffset() * 60000)).toISOString();
  }

  private getMultiply(): number {
    if (isSportActivity(this.model)) {
      return this.model.duration / 60;
    } else if (isFoodActivity(this.model)) {
      return this.model.amount;
    }
  }

  public setCalories() {
    if (this.activityCalories) {
      this.model.calories = Math.round(this.activityCalories * this.getMultiply());
    }
  }

  private isValidNumber(number: string|number) {
    number = parseFloat('' + number);
    return !!number && !isNaN(number);
  }

  public isInvalid() {
    if (isSportActivity(this.model) && !this.isValidNumber(this.model.duration)) {
      return true;
    } else if (isFoodActivity(this.model)) {
      if (!this.isValidNumber(this.model.amount)) return true;
      if (!this.model.item) return true;
      if (typeof this.model.category !== 'number') return true;
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
