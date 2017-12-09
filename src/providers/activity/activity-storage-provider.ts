import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Activity} from './activity';

@Injectable()
export class ActivityStorageProvider {
  private activities: Activity[];
  private promise: Promise<Activity[]>;

  private KEY = 'activities';

  constructor (private storage: Storage) {
    this.promise = this.storage
      .get(this.KEY)
      .then((activities: Activity[]) => {
        this.activities = activities;
        return activities;
      });
  }

  public getActivities(): Promise<Activity[]> {
    return Promise.resolve(this.activities || this.promise);
  }

  public saveActivities(...activities: Activity[]) {
    if (activities.length > 0) {
      this.activities = this.activities.concat(activities);
    }

    this.storage.set(this.KEY, this.activities);
  }

  public deleteActivity(activityToDelete: Activity) {
    this.activities = this.activities.filter(activity => activity !== activityToDelete);
    this.saveActivities();
  }
}
