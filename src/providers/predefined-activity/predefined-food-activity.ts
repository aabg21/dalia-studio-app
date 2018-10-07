import {FoodActivity} from '../activity/food-activity';
import {FoodCategoryEnum} from '../activity/food-category-enum';

export interface PredefinedFoodJSON {
  category: string;
  item: string;
  portionSize: string;
  calories: number;
}

export class PredefinedFoodActivity extends FoodActivity {
  constructor({category, item, portionSize, calories}: PredefinedFoodJSON) {
    super();
    this.item = item;
    this.category = FoodCategoryEnum[category];
    this.amount = 1;
    this.calories = calories;
    this.portionSize = portionSize;
  }
}
