import {Component, Input} from '@angular/core';
import {NavController} from "ionic-angular";
import {WeeklySummaryPage} from "../../../weekly-summary/weekly-summary";

@Component({
  selector: 'insightsAvailableAction',
  templateUrl: 'insights-available-action.html'
})

export class InsightsAvailableActionComponent {
  @Input() date: Date;

  constructor(
    private navCtrl: NavController
  ) {}

  public openWeeklySummary() {
    this.navCtrl.push(WeeklySummaryPage, {week: this.date });
  }
}
