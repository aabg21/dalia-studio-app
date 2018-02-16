import {Component, Input} from '@angular/core';
import {Activity} from '../../../providers/activity/activity';
import {isSportActivity} from '../../../providers/activity/sport-activity';
import {isFoodActivity} from '../../../providers/activity/food-activity';

@Component({
  selector: 'activity-card',
  template: `
    <ion-card>
      <ion-card-header>{{ header }}</ion-card-header>
      <ion-card-content>ספורט</ion-card-content>
    </ion-card>
  `
})
export class CardComponent {
  public header: string;

  @Input()
  public set activity(activity: Activity) {
    if (isSportActivity(activity)) {
      this.header = activity.name;

    } else if (isFoodActivity(activity)) {
      this.header = activity.item;
    }
  }
}
