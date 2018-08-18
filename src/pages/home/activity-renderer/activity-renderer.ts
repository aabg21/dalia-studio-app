import {Component, Input} from '@angular/core';
import {Activity} from '../../../providers/activity/activity';
import {isFoodActivity} from '../../../providers/activity/food-activity';
import {isSportActivity} from '../../../providers/activity/sport-activity';
import {isWeightActivity} from '../../../providers/activity/weight-activity';

@Component({
  selector: 'activityRenderer',
  template: `
    <ng-container [ngSwitch]="activityType">
      <foodActivity *ngSwitchCase="'food'" [activity]="_activity"></foodActivity>
      <sportActivity *ngSwitchCase="'sport'" [activity]="_activity"></sportActivity>
      <weightActivity *ngSwitchCase="'weight'" [activity]="_activity"></weightActivity>
    </ng-container>
  `
})
export class ActivityRendererComponent {
  public activityType: 'food' | 'sport' | 'weight';
  public _activity: Activity;

  @Input() set activity(activity: Activity) {
    this._activity = activity;

    if (isFoodActivity(activity)) {
      this.activityType = 'food';
    } else if (isSportActivity(activity)) {
      this.activityType = 'sport';
    } else if (isWeightActivity(activity)) {
      this.activityType = 'weight';
    }
  }
}
