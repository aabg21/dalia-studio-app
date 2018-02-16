export enum FoodCategoryEnum {
  PROTEIN,
  CARBON,
  VEGTABLES,
  SALADS,
  FRUITS,
  FAT,
  DAIRY,
  BONUS,
  EXTRAS,
}

export const FOOD_CATREGORY_NAMES = {
  [FoodCategoryEnum.PROTEIN]: 'חלבון',
  [FoodCategoryEnum.CARBON]: 'פחמימות',
  [FoodCategoryEnum.VEGTABLES]: 'ירקות',
  [FoodCategoryEnum.SALADS]: 'סלטים',
  [FoodCategoryEnum.FRUITS]: 'פירות',
  [FoodCategoryEnum.FAT]: 'שומן',
  [FoodCategoryEnum.DAIRY]: 'חלב',
  [FoodCategoryEnum.BONUS]: 'צ׳ופר',
  [FoodCategoryEnum.EXTRAS]: 'נוספים',
};
