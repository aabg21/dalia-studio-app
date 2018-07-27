import { Component } from '@angular/core';
import {IonicPage, NavController} from 'ionic-angular';
import {ListPage} from '../list/list';
import {ListGeneratorProvider, Response} from '../../providers/list-generator/list-generator';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  public activities: Response[] = [];
  private dateStartFetching: Date;

  constructor(
    private navCtrl: NavController,
    private listGenerator: ListGeneratorProvider,
  ) {}

  public goToSportList() {
    this.navCtrl.push(ListPage, {
      type: 'SPORT'
    });
  }

  public goToFoodList() {
    this.navCtrl.push(ListPage, {
      type: 'FOOD'
    });
  }

  public ionViewWillEnter() {
    this.dateStartFetching = new Date();
    this.fetchActivities();
  }

  public fetchActivities(): Promise<any> {
    return this.listGenerator
      .getBatch(this.dateStartFetching)
      .then(responses => {
        this.activities.push(...responses);
      })
  }
}
