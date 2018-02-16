import {SportActivity} from '../activity/sport-activity';

const PREDEFINED_ITEM_DATE = new Date();

export interface PredefinedSportJSON {
  name: string;
  duration: string;
  calories: number;
  pulse: string;
}

export class PredefinedSportActivity extends SportActivity {
  public recommendedDuration: string;
  public avgPulse: string;

  constructor({name, duration, calories, pulse}: PredefinedSportJSON) {
    super(name, null, PREDEFINED_ITEM_DATE, calories);

    this.recommendedDuration = duration;
    this.avgPulse = pulse;
  }
}
