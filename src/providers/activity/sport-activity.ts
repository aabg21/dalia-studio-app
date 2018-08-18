import {Activity} from './activity';

export function isSportActivity (activity: Activity): activity is SportActivity {
  return activity['type'] === 'SPORT';
}

export class SportActivity extends Activity {
  protected type = 'SPORT';

  constructor(
    public name: string,
    public duration: number,
    public time: Date,
    public calories: number,
    public notes: string
  ) {
    super();
  }
}
