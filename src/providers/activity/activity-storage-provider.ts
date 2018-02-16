import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {Activity} from './activity';
import {SportActivity} from './sport-activity';

const sport = new SportActivity({
  name: 'חתירה',
  calories: 20,
  time: new Date(),
  duration: 60,
});

@Injectable()
export class ActivityStorageProvider {
  private activities: Activity[] = [sport];
  private promise: Promise<Activity[]>;

  private KEY = 'activities';

  constructor (private storage: Storage) {
    // this.promise = this.storage
    //   .get(this.KEY)
    //   .then((activities: Activity[]) => this.activities = activities || []);
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
