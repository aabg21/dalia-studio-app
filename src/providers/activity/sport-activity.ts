import {Activity} from './activity';

export const isSportActivity = (activity: Activity) => activity['type'] === 'sport';

export class SportActivity extends Activity {
  protected type = 'sport';

  name: string;
  duration: number;
  time: Date;
  calories: number;
}
