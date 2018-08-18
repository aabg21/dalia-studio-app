import {Component, Input} from '@angular/core';
import {Actions} from '../../../../providers/actions-generator/actions-generator';

@Component({
  selector: 'emptyMealAction',
  templateUrl: 'empty-meal-action.html'
})

export class EmptyMealActionComponent {
  public mealName: string;

  @Input() set action (action: Actions) {
    switch (action) {
      case Actions.EMPTY_BREAKFAST:
        this.mealName = 'בוקר';
        break;
      case Actions.EMPTY_LUNCH:
        this.mealName = 'צהריים';
        break;
      case Actions.EMPTY_DINNER:
        this.mealName = 'ערב';
        break;
    }
  }
}
