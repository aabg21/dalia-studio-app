import {Activity} from './activity';

export function isSportActivity (activity: Activity): activity is SportActivity {
  return activity['type'] === 'SPORT';
}

export class SportActivity extends Activity {
  protected type = 'SPORT';
  public name = '';
  public duration = 0;
  public time: Date;
  public calories = 0;
  public notes = '';
}
