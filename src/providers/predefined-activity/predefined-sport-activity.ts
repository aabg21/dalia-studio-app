import {SportActivity} from '../activity/sport-activity';

export interface PredefinedSportJSON {
  name: string;
  calories: number;
}

export class PredefinedSportActivity extends SportActivity {
  constructor({name, calories}: PredefinedSportJSON) {
    super();
    this.name = name;
    this.calories = calories;
  }
}
