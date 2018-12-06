import {Component, Input} from '@angular/core';
import {Actions} from '../../../providers/actions-generator/actions-generator';


@Component({
  selector: 'actionRenderer',
  template: `
    <ng-container [ngSwitch]="actionType">
      <emptyMealAction *ngSwitchCase="'empty_meal'" [action]="_action"></emptyMealAction>
      <insightsAvailableAction *ngSwitchCase="'insights'" [date]="date"></insightsAvailableAction>
      <weightActivity *ngSwitchCase="'weight'" [date]="date"></weightActivity>
    </ng-container>
  `
})
export class ActionRendererComponent {
  public actionType: 'empty_meal' | 'insights' | 'weight';
  public _action: Actions;

  @Input() set action(action: Actions) {
    this._action = action;
    switch (action) {
      case Actions.EMPTY_BREAKFAST:
      case Actions.EMPTY_LUNCH:
      case Actions.EMPTY_DINNER:
        this.actionType = 'empty_meal';
        break;
      case Actions.INSIGHTS_AVAILABLE:
        this.actionType = 'insights';
        break;
      case Actions.WEIGHT_NEEDED:
        this.actionType = 'weight';
    }
  }

  @Input() date: Date;
}
