import { Injectable } from '@angular/core';
import {SettingsProvider} from '../settings/settings';
import {ActivityStorageProvider} from '../activity/activity-storage-provider';
import {Activity} from '../activity/activity';
import {isWeightActivity} from '../activity/weight-activity';
import {isFoodActivity} from '../activity/food-activity';
import {isSportActivity} from '../activity/sport-activity';

@Injectable()
export class CaloriesBankProvider {
  static COEFFICIENT = 26 * 7;

  constructor(
    private activityStorage: ActivityStorageProvider,
    private settings: SettingsProvider
  ) {}

  public getQuota(finalDay: Date): Promise<number> {
    const from = this.getStartingDay(finalDay),
          to = this.getEndingDay(finalDay),
          allActivities = this.getActivitiesForDuration(from, to);

    return allActivities.then(this.calcQuotaByActivities);
  }

  private resetDay(day: Date): Date {
    const newDay = new Date(day);

    newDay.setHours(0);
    newDay.setMinutes(0);
    newDay.setSeconds(0);
    newDay.setMilliseconds(0);

    return newDay;
  }

  private getStartingDay(finalDay: Date): Date {
    const startingDay = this.resetDay(finalDay),
          dayOfWeek = finalDay.getDay();

    let daysDiff = this.settings.sprintStartDay - dayOfWeek;

    if (dayOfWeek === 0) {
      return startingDay;
    }

    if (daysDiff > 0) {
      daysDiff -= 7;
    }

    startingDay.setDate(startingDay.getDate() + daysDiff);
    return startingDay;
  }

  private getEndingDay(date: Date): Date {
    const endingDay = this.resetDay(date);

    endingDay.setDate(endingDay.getDate() + 1);

    return endingDay;
  }

  private getActivitiesForDuration(from: Date, to: Date): Promise<Activity[]> {
    return this.activityStorage.getActivities()
      .then(allActivities => {
        return allActivities.filter(activity => activity.time >= from && activity.time < to);
      });
  }

  private calcQuotaByActivities(activities: Activity[]): number {
    const [weight] = activities.filter(isWeightActivity);

    if (!weight) {
      return null;
    }

    const foodActivities = activities.filter(isFoodActivity),
          calFood = foodActivities.reduce((cal, food) => cal + food.calories, 0),
          sportActivities = activities.filter(isSportActivity),
          calSport = sportActivities.reduce((cal, food) => cal + food.calories, 0);

    return (weight.weight * CaloriesBankProvider.COEFFICIENT) + calSport - calFood;
  }
}
