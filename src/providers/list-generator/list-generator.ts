import { Injectable } from '@angular/core';
import {SettingsProvider} from '../settings/settings';
import {ActivityStorageProvider} from '../activity/activity-storage-provider';
import {Activity} from '../activity/activity';
import * as moment from 'moment';

export interface Response {
  dateFormatted: string;
  actions: any[];
  activities: Activity[];
}

@Injectable()
export class ListGeneratorProvider {
  constructor(
    private settings: SettingsProvider,
    private activityStorage: ActivityStorageProvider
  ) {}
  private THRESHOLD = 14;

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
      .then(activities => {
        const responses: Response[] = [];
        let prevDate = new Date(from);

        prevDate.setDate(prevDate.getDate() + 1);

        for (let times = this.THRESHOLD; times--;) {
          if (+from < this.settings.accountCreatedTimestamp) {
            break;
          }

          // activities
          // actions

          responses.push({
            dateFormatted: moment(from).format('dddd, D MMMM'),
            actions: [],
            activities: [],
          });

          prevDate = new Date(from);
          from.setDate(from.getDate() - 1);
        }

        return responses;
      });
  }
}
