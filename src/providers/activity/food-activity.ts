import {Activity} from './activity';

export const isFoodActivity = (activity: Activity) => activity['type'] === 'food';

export class FoodActivity extends Activity {
  protected type = 'food';

  item: string;
  category: string;
  time: Date;
  calories: number;
}
