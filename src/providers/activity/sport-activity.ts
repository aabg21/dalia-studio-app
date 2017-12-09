import {Activity} from './activity';

export const isSportActivity = (activity: Activity) => activity.type === 'sport';

export class SportActivity extends Activity {
  type: 'sport' = 'sport';

  name: string;
  duration: number;
  time: Date;
  calories: number;
}
