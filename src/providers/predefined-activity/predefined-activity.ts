import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {PredefinedFoodActivity, PredefinedFoodJSON} from './predefined-food-activity';
import {PredefinedSportActivity, PredefinedSportJSON} from './predefined-sport-activity';

@Injectable()
export class PredefinedActivityProvider {
  constructor (
    private http: HttpClient
  ) {}

  public foodActivities: PredefinedFoodActivity[];
  public sportActivities: PredefinedSportActivity[];

  public fetch() {
    this.http
      .get('assets/data/predefined-activities.json')
      .subscribe((response: {food: PredefinedFoodJSON[], sport: PredefinedSportJSON[]}) => {
        this.foodActivities = response.food.map(item => new PredefinedFoodActivity(item));
        this.sportActivities = response.sport.map(item => new PredefinedSportActivity(item));
      });
  }
}
