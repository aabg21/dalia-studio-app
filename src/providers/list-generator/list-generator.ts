import { Injectable } from '@angular/core';
import {SettingsProvider} from '../settings/settings';
import {ActivityStorageProvider} from '../activity/activity-storage-provider';
import {Activity} from '../activity/activity';
import * as moment from 'moment';
import {ActionsGeneratorProvider} from '../actions-generator/actions-generator';

export interface Response {
  dateFormatted: string;
  actions: any[];
  activities: Activity[];
}

@Injectable()
export class ListGeneratorProvider {
  constructor(
    private settings: SettingsProvider,
    private activityStorage: ActivityStorageProvider,
    private actionsGenerator: ActionsGeneratorProvider
  ) {}
  private THRESHOLD = 7;

  private resetDate(date: Date): Date {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }

  public getBatch (from: Date): Promise<Response[]> {
    if (isNaN(+from)) {
      return Promise.resolve([]);
    }

    this.resetDate(from);

    return this.activityStorage
      .getActivities()
      .then(allActivities => {
        const responses: Response[] = [];
        let prevDate = new Date(from);

        prevDate.setDate(prevDate.getDate() + 1);

        for (let times = this.THRESHOLD; times--;) {
          if (+from < this.settings.accountCreatedTimestamp) {
            break;
          }

          const activities = allActivities.filter((activity: Activity) => {
            return activity.time >= from && activity.time < prevDate;
          });

          const actions = this.actionsGenerator.actionsByActivities(activities, from, prevDate);

          responses.push({
            dateFormatted: moment(from).format('dddd, D MMMM'),
            actions,
            activities,
          });

          prevDate = new Date(from);
          from.setDate(from.getDate() - 1);
        }

        return responses;
      });
  }
}
