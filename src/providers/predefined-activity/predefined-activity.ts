import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PredefinedFoodActivity, PredefinedFoodJSON} from './predefined-food-activity';
import {PredefinedSportActivity, PredefinedSportJSON} from './predefined-sport-activity';

@Injectable()
export class PredefinedActivityProvider {
  get sportActivities(): PredefinedSportActivity[] {
    return this._sportActivities;
  }

  get foodActivities(): PredefinedFoodActivity[] {
    return this._foodActivities;
  }

  private _foodActivities: PredefinedFoodActivity[];
  private _sportActivities: PredefinedSportActivity[];

  constructor(private http: HttpClient) {}

  public fetch() {
    this.http
      .get('assets/data/predefined-activities.json')
      .subscribe((response: {food: PredefinedFoodJSON[], sport: PredefinedSportJSON[]}) => {
        this._foodActivities = response.food.map(item => new PredefinedFoodActivity(item));
        this._sportActivities = response.sport.map(item => new PredefinedSportActivity(item));
      });
  }
}
