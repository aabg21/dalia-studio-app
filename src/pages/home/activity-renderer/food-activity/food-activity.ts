import {Component, Input} from '@angular/core';
import {FoodActivity} from '../../../../providers/activity/food-activity';
import {ItemDetailsPage} from '../../../item-details/item-details';
import {AlertController, ModalController, NavController} from 'ionic-angular';
import {ActivityStorageProvider} from '../../../../providers/activity/activity-storage-provider';

@Component({
  selector: 'foodActivity',
  templateUrl: 'food-activity.html'
})

export class FoodActivityComponent {
  @Input() activity: FoodActivity;

  public deleted: boolean;

  constructor (
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private activityStorage: ActivityStorageProvider
  ) {}

  edit() {
    this.modalCtrl
      .create(ItemDetailsPage, {activity: this.activity, isEdit: true})
      .present();
  }

  delete() {
    this.alertCtrl
      .create({
        title: 'אישור מחיקה',
        buttons: [
          {
            text: 'ביטול',
            role: 'cancel',
          },
          {
            text: 'מחק',
            handler: () => {
              this.activityStorage.deleteActivity(this.activity);
              this.deleted = true;
            }
          }
        ]
      })
      .present();
  }
}
