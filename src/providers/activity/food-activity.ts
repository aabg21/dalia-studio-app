import {Activity} from './activity';
import {FoodCategoryEnum} from './food-category-enum';

export function isFoodActivity (activity: Activity): activity is FoodActivity {
  return activity['type'] === 'FOOD';
}

export class FoodActivity extends Activity {
  protected type = 'FOOD';
  public item = '';
  public category: FoodCategoryEnum;
  public time: Date;
  public amount = 0;
  public calories = 0;
  public notes = '';
  public portionSize = '';
}
