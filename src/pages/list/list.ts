import { Component } from '@angular/core';

import {ModalController, NavController, NavParams} from 'ionic-angular';

import { groupBy } from 'lodash';

import { ItemDetailsPage } from '../item-details/item-details';
import {Activity} from '../../providers/activity/activity';
import {PredefinedActivityProvider} from '../../providers/predefined-activity/predefined-activity';
import {FOOD_CATEGORY_ORDER, FOOD_CATEGORY_NAMES} from '../../providers/activity/food-category-enum';
import {ActivityStorageProvider} from "../../providers/activity/activity-storage-provider";
import {isFoodActivity} from "../../providers/activity/food-activity";

interface Item {
  title: string;
  note: string;
  activity: Activity;
  isRecent: boolean;
}

interface CategoryItem {
  category: string;
  items: Item[];
}

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  private allItems: Item[];
  public categoryItems: CategoryItem[];
  public items: Item[];

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    navParams: NavParams,
    predefinedActivities: PredefinedActivityProvider,
    private activityStorage: ActivityStorageProvider
  ) {
    const isFood = navParams.get('type') === 'FOOD';

    if (isFood) {
      this.allItems = predefinedActivities.foodActivities.map(food => (<Item>{
        activity: food,
        title: food.item,
        note: food.portionSize,
        isRecent: false,
      }));

      const grouped = groupBy(this.allItems, 'activity.category');

      this.categoryItems = FOOD_CATEGORY_ORDER.map(category => (<CategoryItem>{
        category: FOOD_CATEGORY_NAMES[category],
        items: grouped[category]
      }));

      this.addRecentFood();

    } else {
      this.items = this.allItems = predefinedActivities.sportActivities.map(sport => (<Item>{
        activity: sport,
        title: sport.name,
        note: sport.calories? `${sport.calories} קלוריות ` : '',
        isRecent: false,
      }));
    }
  }

  private addRecentFood() {
    this.activityStorage.getActivities().then(activities => {
      const recent: Item[] = activities
        .filter(isFoodActivity)
        .slice(-5)
        .reverse()
        .map(food => ({
          activity: food,
          title: food.item,
          note: food.portionSize,
          isRecent: true,
        }));

      if (recent.length > 0) {
        this.categoryItems = [{
          category: 'אחרונים',
          items: recent
        }, ...this.categoryItems];
      }
    });
  }

  filterItems(evnt: UIEvent) {
    let { value } = <HTMLInputElement>evnt.target;

    if (!value) {
      this.items = this.categoryItems ? null : this.allItems;
    } else {
      value = value.toLowerCase();
      this.items = this.allItems.filter(item => item.title.toLowerCase().includes(value));
    }
  }

  itemTapped(item?: Item) {
    const modal = this.modalCtrl.create(ItemDetailsPage, item);

    modal.onDidDismiss((result: boolean) => {
      if (result) {
        this.navCtrl.popToRoot();
      }
    });

    modal.present();
  }
}
