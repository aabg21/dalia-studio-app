import { Component, ViewChild } from '@angular/core';

import { Platform, Nav } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {HomePage} from '../pages/home/home';


@Component({
  template: `
    <ion-nav [root]="rootPage" swipeBackEnabled="false"></ion-nav>
  `
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = HomePage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page);
  }
}
