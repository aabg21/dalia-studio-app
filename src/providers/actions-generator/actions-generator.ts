import { Injectable } from '@angular/core';
import {Activity} from '../activity/activity';
import {isFoodActivity} from '../activity/food-activity';
import {SettingsProvider} from '../settings/settings';
import {isWeightActivity} from '../activity/weight-activity';

export enum Actions {
  EMPTY_BREAKFAST,
  EMPTY_LUNCH,
  EMPTY_DINNER,
  WEIGHT_NEEDED,
  INSIGHTS_AVAILABLE
}

@Injectable()
export class ActionsGeneratorProvider {
  private static mealTimes: [Actions, number, number][] = [
    [Actions.EMPTY_BREAKFAST, 6, 12],
    [Actions.EMPTY_LUNCH, 12, 16],
    [Actions.EMPTY_DINNER, 16, 22]
  ];

  private _actions: Actions[];

  constructor(
    private settings: SettingsProvider
  ) {}

  public actionsByActivities(activities: Activity[], startPeriod: Date, endPeriod: Date) {
    this._actions = [];

    this.weightValidator(activities, startPeriod);
    this.emptyMealsValidator(activities, endPeriod);

    return this._actions;
  }

  private emptyMealsValidator(activities: Activity[], endPeriod: Date) {
    const foodActivities = activities.filter(activity => isFoodActivity(activity)),
          today = new Date(),
          isToday = endPeriod > today;

    for (const mealTime of ActionsGeneratorProvider.mealTimes) {
      if (isToday && today.getHours() < mealTime[1]) break;

      const hasMeal = foodActivities.some(activity => {
        const hour = activity.time.getHours();
        return hour >= mealTime[1] && hour < mealTime[2];
      });

      if (!hasMeal) {
        this._actions.push(mealTime[0]);
      }
    }
  }

  private weightValidator(activity: Activity[], startDay: Date) {
    if (startDay.getDay() === this.settings.sprintStartDay) {
      const hasWeight = activity.some(activity => isWeightActivity(activity));

      if (hasWeight && +startDay > this.settings.accountCreatedTimestamp) {
        this._actions.push(Actions.INSIGHTS_AVAILABLE);
      } else {
        this._actions.push(Actions.WEIGHT_NEEDED);
      }
    }
  }
}
