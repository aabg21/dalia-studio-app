import {Component, Input} from '@angular/core';
import {Activity} from "../../../providers/activity/activity";
import {isFoodActivity} from "../../../providers/activity/food-activity";
import {isSportActivity} from "../../../providers/activity/sport-activity";


@Component({
  selector: 'totalRenderer',
  template: `
    <ion-item>
      <ion-icon name="ios-arrow-forward" item-start></ion-icon>
      <h2>סיכום יומי</h2>
      <button ion-button clear item-end style="width: 50px;" (click)="shown = !shown">{{ shown ? 'הסתר' : 'הצג' }}</button>
      <expandable [expanded]="shown" [expandedHeight]="150">
        <ion-list item-content>
          <ion-item>
            <p item-start>קלוריות מאוכל:</p>
            <p item-end>{{ totalFoodCalories | number }}</p>
          </ion-item>
          <ion-item>
            <p item-start>קלוריות ספורט:</p>
            <p item-end>{{ totalSportCalories | number }}</p>
          </ion-item>
          <ion-item>
            <p item-start>זמן פעילות:</p>
            <p item-end>{{ totalSportTime | number }} דקות</p>
          </ion-item>
        </ion-list>
      </expandable>
    </ion-item>

  `
})
export class TotalRendererComponent {
  @Input() set activities(activities: Activity[]) {
    this.makeTotals(activities);
  }

  public shown = false;
  public totalFoodCalories: number;
  public totalSportCalories: number;
  public totalSportTime: number;

  private makeTotals(activities: Activity[]) {
    this.totalFoodCalories = activities.filter(isFoodActivity).reduce((sum, food) => sum + food.calories, 0);

    const sportActivities = activities.filter(isSportActivity);
    this.totalSportCalories = sportActivities.reduce((sum, food) => sum + food.calories, 0);
    this.totalSportTime = sportActivities.reduce((sum, food) => sum + food.duration, 0);
  }
}
