import {Activity} from './activity';

export function isSportActivity (activity: Activity): activity is SportActivity {
  return activity['type'] === 'SPORT';
}

export class SportActivity extends Activity {
  protected type = 'SPORT';

  name: string;
  duration: number;
  time: Date;
  calories: number;

  constructor({
    name,
    duration,
    time,
    calories,
  }: {
    name: string;
    duration: number;
    time: Date;
    calories: number;
  }) {
    super();

    this.name = name;
    this.duration = duration;
    this.time = time;
    this.calories = calories;
  }
}
