export enum FoodCategoryEnum {
  PROTEIN,
  CARBON,
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
  FoodCategoryEnum.CARBON,
  FoodCategoryEnum.VEGETABLES,
  FoodCategoryEnum.SALADS,
  FoodCategoryEnum.FRUITS,
  FoodCategoryEnum.FAT,
  FoodCategoryEnum.DAIRY,
  FoodCategoryEnum.BONUS,
];

export const FOOD_CATREGORY_NAMES: {[category: number]: string} = {
  [FoodCategoryEnum.PROTEIN]: 'חלבון',
  [FoodCategoryEnum.CARBON]: 'פחמימות',
  [FoodCategoryEnum.VEGETABLES]: 'ירקות',
  [FoodCategoryEnum.SALADS]: 'סלטים',
  [FoodCategoryEnum.FRUITS]: 'פירות',
  [FoodCategoryEnum.FAT]: 'שומן',
  [FoodCategoryEnum.DAIRY]: 'חלב',
  [FoodCategoryEnum.BONUS]: 'צ׳ופר',
  [FoodCategoryEnum.EXTRAS]: 'נוספים',
};
