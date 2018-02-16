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
    super({
      category: FoodCategoryEnum[category],
      item,
      calories,
      time: PREDEFINED_ITEM_DATE,
      amount: 1,
    });

    this.portionSize = portionSize;
    this.recommendedSize = recommendedSize;
  }
}
