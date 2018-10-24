import {Component, Input} from '@angular/core';
import {FoodActivity} from '../../../../providers/activity/food-activity';
import {ItemDetailsPage} from '../../../item-details/item-details';
import {AlertController, ModalController, ToastController} from 'ionic-angular';
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
    private activityStorage: ActivityStorageProvider,
    private toastCtrl: ToastController
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
              this.toastCtrl.create({
                message: 'הפריט נמחק בהצלחה',
                duration: 3000,
              }).present();
            }
          }
        ]
      })
      .present();
  }
}
