import {Component, Input} from '@angular/core';
import {AlertController, NavController} from 'ionic-angular';
import {ActivityStorageProvider} from '../../../../providers/activity/activity-storage-provider';
import {WeightActivity} from '../../../../providers/activity/weight-activity';

@Component({
  selector: 'enterWeightAction',
  templateUrl: 'enter-weight-action.html'
})

export class EnterWeightActionComponent {
  @Input() date: Date;

  constructor(
    private alertCtrl: AlertController,
    private activityStorage: ActivityStorageProvider,
    private navCtrl: NavController
  ) {}

  enterWeight() {
    this.alertCtrl
      .create({
        title: 'משקל חדש',
        message: 'משקל בקילוגרם',
        inputs: [
          {
            type: 'number',
            value: '50.0',
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
                this.activityStorage.addActivities(new WeightActivity(this.date, weight));
                this.navCtrl.goToRoot({});
              }
            }
          }
        ]
      })
      .present();
  }
}
