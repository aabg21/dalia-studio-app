import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ActivityStorageProvider} from '../../providers/activity/activity-storage-provider';
import {Activity} from '../../providers/activity/activity';
import {ListPage} from '../list/list';
import {PredefinedActivityProvider} from '../../providers/predefined-activity/predefined-activity';

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
      <ion-fab top left edge>
        <button ion-fab mini color="secondary"><ion-icon name="add"></ion-icon></button>
        <ion-fab-list>
          <button ion-fab (click)="goToSportList()"><ion-icon name="bicycle"></ion-icon></button>
          <button ion-fab (click)="goToFoodList()"><ion-icon name="cafe"></ion-icon></button>
        </ion-fab-list>
      </ion-fab>
      <activity-card *ngFor="let activity of activities" [activity]="activity"></activity-card>
    </ion-content>
  `,
})
export class HomePage {
  public activities: Activity[];

  constructor(
    private activityStorage: ActivityStorageProvider,
    private navCtrl: NavController,
    private preAct: PredefinedActivityProvider
  ) {
    this.activityStorage.getActivities().then(activities => this.activities = activities);
  }

  public goToSportList() {
    this.navCtrl.push(ListPage);
  }

  public goToFoodList() {
    this.navCtrl.push(ListPage)
  }
}
