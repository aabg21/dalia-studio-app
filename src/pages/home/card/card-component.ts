import {Component, Input} from '@angular/core';
import {Activity} from '../../../providers/activity/activity';
import {isSportActivity, SportActivity} from '../../../providers/activity/sport-activity';
import {isFoodActivity, FoodActivity} from '../../../providers/activity/food-activity';

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
  @Input()
  public set activity(activity: Activity) {
    switch (true) {
      case isSportActivity(activity):
        this.header = (<SportActivity>activity).name;
        break;
      case isFoodActivity(activity):
        this.header = (<FoodActivity>activity).item;
    }
  }

  public header: string;
}
