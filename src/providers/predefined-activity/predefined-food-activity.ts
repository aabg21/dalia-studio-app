import {FoodActivity} from '../activity/food-activity';
import {FoodCategoryEnum} from '../activity/food-category-enum';

const PREDEFINED_ITEM_DATE = new Date();

export interface PredefinedFoodJSON {
  category: string;
  item: string;
  portionSize: string;
  calories: number;
  recommendedSize: string;
}

export class PredefinedFoodActivity extends FoodActivity {
  portionSize: string;
  recommendedSize: string;

  constructor({category, item, portionSize, calories, recommendedSize}: PredefinedFoodJSON) {
    super(item, FoodCategoryEnum[category], PREDEFINED_ITEM_DATE, 1, calories, '');

    this.portionSize = portionSize;
    this.recommendedSize = recommendedSize;
  }
}
