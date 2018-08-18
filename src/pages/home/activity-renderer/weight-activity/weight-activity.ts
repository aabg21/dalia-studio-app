import {Component, Input} from '@angular/core';
import {WeightActivity} from '../../../../providers/activity/weight-activity';
import {AlertController, NavController} from 'ionic-angular';
import {ActivityStorageProvider} from '../../../../providers/activity/activity-storage-provider';

@Component({
  selector: 'weightActivity',
  templateUrl: 'weight-activity.html'
})

export class WeightActivityComponent {
  @Input() activity: WeightActivity;

  constructor(
    private alertCtrl: AlertController,
    private activityStorage: ActivityStorageProvider,
    private navCtrl: NavController
  ) {}

  public amend() {
    this.alertCtrl
      .create({
        title: 'תיקון משקל',
        message: 'משקל בקילוגרם',
        inputs: [
          {
            type: 'number',
            value: this.activity.weight + '',
            min: '1',
            max: '200'
          }
        ],
        buttons: [
          {
            role: 'cancel',
            text: 'ביטול'
          },
          {
            text: 'אישור',
            handler: ({0: weight}) => {
              weight = parseFloat(weight);
              if (!isNaN(weight) && weight > 1 && weight < 300) {
                this.activity.weight = weight;
                this.activityStorage.save();
                this.navCtrl.goToRoot({});
              }
            }
          }
        ]
      })
      .present();
  }
}
