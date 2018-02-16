import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PredefinedFoodActivity, PredefinedFoodJSON} from './predefined-food-activity';

@Injectable()
export class PredefinedActivityProvider {
  get sportActivities(): any[] {
    return this._sportActivities;
  }
  get foodActivities(): PredefinedFoodActivity[] {
    return this._foodActivities;
  }

  private _foodActivities: PredefinedFoodActivity[];
  private _sportActivities: any[];

  constructor(public http: HttpClient) {
    http
      .get('assets/data/predefined-activities.json')
      .subscribe((response: {food: PredefinedFoodJSON[]}) => {
        this._foodActivities = response.food.map(item => new PredefinedFoodActivity(item));
        console.log(this._foodActivities);
      });
  }
}
