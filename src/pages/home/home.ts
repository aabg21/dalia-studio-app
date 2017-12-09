import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import {ActivityStorageProvider} from '../../providers/activity/activity-storage-provider';
import {Activity} from '../../providers/activity/activity';

@IonicPage()
@Component({
  selector: 'page-home',
  template: `
    <ion-header>
      <ion-navbar color="primary">
        <ion-title>הסטודיו של דליה קולדהם</ion-title>
      </ion-navbar>
    </ion-header>
  
    <ion-content padding>
      <activity-card *ngFor="let activity of activities" [activity]="activity"></activity-card>
    </ion-content>
  `,
})
export class HomePage {
  activities: Activity[];

  constructor(private activityStorage: ActivityStorageProvider) {
    this.activityStorage.getActivities().then(activities => this.activities = activities);
  }
}
