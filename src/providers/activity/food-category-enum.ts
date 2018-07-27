export enum FoodCategoryEnum {
  PROTEIN,
  CARBS,
  VEGETABLES,
  SALADS,
  FRUITS,
  FAT,
  DAIRY,
  BONUS,
  EXTRAS,
}

export const FOOD_CATEGORY_ORDER = [
  FoodCategoryEnum.PROTEIN,
  FoodCategoryEnum.CARBS,
  FoodCategoryEnum.VEGETABLES,
  FoodCategoryEnum.SALADS,
  FoodCategoryEnum.FRUITS,
  FoodCategoryEnum.FAT,
  FoodCategoryEnum.DAIRY,
  FoodCategoryEnum.BONUS,
];

export const FOOD_CATREGORY_NAMES: {[category: number]: string} = {
  [FoodCategoryEnum.PROTEIN]: 'חלבון',
  [FoodCategoryEnum.CARBS]: 'פחמימות',
  [FoodCategoryEnum.VEGETABLES]: 'ירקות',
  [FoodCategoryEnum.SALADS]: 'סלטים',
  [FoodCategoryEnum.FRUITS]: 'פירות',
  [FoodCategoryEnum.FAT]: 'שומן',
  [FoodCategoryEnum.DAIRY]: 'חלב',
  [FoodCategoryEnum.BONUS]: 'צ׳ופר',
  [FoodCategoryEnum.EXTRAS]: 'נוספים',
};
