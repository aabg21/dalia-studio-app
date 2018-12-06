import {Component} from '@angular/core';
import {IonicPage, NavParams} from 'ionic-angular';
import {Activity} from "../../providers/activity/activity";
import {isFoodActivity} from "../../providers/activity/food-activity";
import * as moment from 'moment';
import {ActivityStorageProvider} from "../../providers/activity/activity-storage-provider";
import {isSportActivity} from "../../providers/activity/sport-activity";
import {FOOD_CATEGORY_NAMES, FOOD_CATEGORY_ORDER} from "../../providers/activity/food-category-enum";

/**
 * Generated class for the WeeklySummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

type BarChartData = {value: number, name: string, day: number}[];
type DonutChartData = {quantity: number, name: string}[];

@IonicPage()
@Component({
  selector: 'page-weekly-summary',
  templateUrl: 'weekly-summary.html',
})
export class WeeklySummaryPage {
  public caloriesFromFood: BarChartData;
  public caloriesFromSport: BarChartData;
  public sportTotalDuration: BarChartData;
  public foodFamilyDonut: DonutChartData;

  constructor(
    navParams: NavParams,
    activityStorage: ActivityStorageProvider
  ) {
    activityStorage.getActivities().then((activities) => {
      const to = new Date(navParams.get('week'));
      const from = new Date(to);
      from.setDate(from.getDate() - 7);

      const activitiesOfDuration = activities.filter(activity => {
        return activity.time >= from && activity.time < to;
      });

      this.calcFoodChart(activitiesOfDuration, from, to);
      this.calcSportChart(activitiesOfDuration, from, to);
    });
  }

  private getEmptyData(from: Date, to: Date): BarChartData {
    const date = new Date(from);
    const emptyData: BarChartData = [];

    while (date < to) {
      emptyData.push({ name: moment(date).format('dddd'), value: 0, day: date.getDay() });
      date.setDate(date.getDate() + 1);
    }

    return emptyData;
  }

  private baseCalculator<T extends Activity>(activities: T[], from: Date, to: Date, predicate: (activity: T) => number) {
    const counters = [0, 0, 0, 0, 0, 0, 0];
    const emptyData = this.getEmptyData(from, to);

    for (const activity of activities) {
      counters[activity.time.getDay()] += predicate(activity);
    }

    for (const series of emptyData) {
      series.value = counters[series.day];
    }

    return emptyData;
  }

  private calcFoodChart(activities: Activity[], from: Date, to: Date) {
    const foodActivities = activities.filter(isFoodActivity);
    this.caloriesFromFood = this.baseCalculator(foodActivities, from, to, activity => activity.calories);
    this.foodFamilyDonut = FOOD_CATEGORY_ORDER.map(category => ({
      name: FOOD_CATEGORY_NAMES[category],
      quantity: foodActivities
        .filter(activity => activity.category === category)
        .length,
    }));
  }

  private calcSportChart(activities: Activity[], from: Date, to: Date) {
    const sportActivities = activities.filter(isSportActivity);
    this.caloriesFromSport = this.baseCalculator(sportActivities, from, to, activity => activity.calories);
    this.sportTotalDuration = this.baseCalculator(sportActivities, from, to, activity => activity.duration);
  }
}
