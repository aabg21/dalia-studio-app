import {Component, Input, OnInit} from '@angular/core';
import {isWeightActivity, WeightActivity} from '../../../../providers/activity/weight-activity';
import {AlertController, NavController} from 'ionic-angular';
import {ActivityStorageProvider} from '../../../../providers/activity/activity-storage-provider';

@Component({
  selector: 'weightActivity',
  templateUrl: 'weight-activity.html'
})
export class WeightActivityComponent implements OnInit {
  private static DEFAULT_WEIGHT = 50;

  @Input() readonly activity?: WeightActivity;
  @Input() readonly date?: Date;

  public isEdit: boolean;

  constructor(
    private alertCtrl: AlertController,
    private activityStorage: ActivityStorageProvider,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.isEdit = !this.date;
  }

  public openDialog() {
    if (this.isEdit) {
      this._openDialog(this.activity.weight);
    } else {
      this.activityStorage
        .getActivities()
        .then(activities => {
          const weightActivities = activities.filter(isWeightActivity);
          const dialogWeight = weightActivities.length === 0 ?
            WeightActivityComponent.DEFAULT_WEIGHT :
            weightActivities[weightActivities.length - 1].weight;

          this._openDialog(dialogWeight);
        });
    }
  }

  private _openDialog(weight: number) {
    this.alertCtrl
      .create({
        title: this.isEdit ? 'תיקון משקל' : 'משקל חדש',
        message: 'משקל בקילוגרם',
        inputs: [
          {
            type: 'number',
            value: '' + weight,
            min: '20',
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

              if (isNaN(weight) || weight < 20 || weight > 200) return false;

              if (this.isEdit) {
                this.activity.weight = weight;
                this.activityStorage.save();
              } else {
                this.activityStorage.addActivities(new WeightActivity(this.date, weight));
              }

              this.navCtrl.goToRoot({});
            }
          }
        ]
      })
      .present();
  }
}
