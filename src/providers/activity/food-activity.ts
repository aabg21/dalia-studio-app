import {Activity} from './activity';
import {FoodCategoryEnum} from './food-category-enum';

export function isFoodActivity (activity: Activity): activity is FoodActivity {
  return activity['type'] === 'FOOD';
}

export class FoodActivity extends Activity {
  protected type = 'FOOD';

  constructor(
    public item: string,
    public category: FoodCategoryEnum,
    public time: Date,
    public amount: number,
    public calories: number,
    public notes: string
  ) {
    super();
  }
}
