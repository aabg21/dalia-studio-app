import {Component, Input} from '@angular/core';
import {SportActivity} from '../../../../providers/activity/sport-activity';
import {AlertController, ModalController, ToastController} from 'ionic-angular';
import {ItemDetailsPage} from '../../../item-details/item-details';
import {ActivityStorageProvider} from '../../../../providers/activity/activity-storage-provider';

@Component({
  selector: 'sportActivity',
  templateUrl: 'sport-activity.html'
})

export class SportActivityComponent {
  @Input() activity: SportActivity;

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
