import {Activity} from './activity';

export const isFoodActivity = (activity: Activity) => activity.type === 'food';

export class FoodActivity extends Activity {
  type: 'food' = 'food';

  item: string;
  category: string;
  time: Date;
  calories: number;
}
