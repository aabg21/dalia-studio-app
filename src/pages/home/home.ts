import {Component, ViewChild} from '@angular/core';
import {Content, FabContainer, IonicPage, List, NavController} from 'ionic-angular';
import {ListPage} from '../list/list';
import {ListGeneratorProvider, Response} from '../../providers/list-generator/list-generator';
import {CaloriesBankProvider} from '../../providers/calories-bank/calories-bank';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild(Content) content: Content;
  @ViewChild(List) list: List;
  @ViewChild(FabContainer) fab: FabContainer;

  public activities: Response[];
  public caloriesBankPts: number;
  private dateStartFetching: Date;

  constructor(
    private navCtrl: NavController,
    private listGenerator: ListGeneratorProvider,
    private caloriesBank: CaloriesBankProvider
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
    this.activities = [];

    this.caloriesBank
      .getQuota(this.dateStartFetching)
      .then(pts => this.caloriesBankPts = pts);

    this.content.scrollToTop();
    this.list.closeSlidingItems();
    this.fab.close();
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
