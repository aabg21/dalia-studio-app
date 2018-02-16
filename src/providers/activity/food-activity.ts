import {Activity} from './activity';
import {FoodCategoryEnum} from './food-category-enum';

export function isFoodActivity (activity: Activity): activity is FoodActivity {
  return activity['type'] === 'FOOD';
}

export class FoodActivity extends Activity {
  protected type = 'FOOD';

  item: string;
  category: FoodCategoryEnum;
  time: Date;
  amount: number;
  calories: number;

  constructor({
    item,
    category,
    time,
    amount,
    calories,
  }: {
    item: string;
    category: FoodCategoryEnum;
    time: Date;
    amount: number;
    calories: number;
  }) {
    super();

    this.item = item;
    this.category = category;
    this.time = time;
    this.amount = amount;
    this.calories = calories;
  }
}
