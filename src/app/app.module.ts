import {BrowserModule} from '@angular/platform-browser';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';
import {MyApp} from './app.component';

import {ItemDetailsPage} from '../pages/item-details/item-details';
import {ListPage} from '../pages/list/list';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HomePageModule} from '../pages/home/home.module';
import {HomePage} from '../pages/home/home';
import {ActivityStorageProvider} from '../providers/activity/activity-storage-provider';
import {IonicStorageModule} from '@ionic/storage';
import {PredefinedActivityProvider} from '../providers/predefined-activity/predefined-activity';
import {HttpClientModule} from '@angular/common/http';
import {SettingsProvider} from '../providers/settings/settings';
import {locale} from 'moment';
import {ListGeneratorProvider} from '../providers/list-generator/list-generator';
import {ActionsGeneratorProvider} from '../providers/actions-generator/actions-generator';
import {CaloriesBankProvider} from '../providers/calories-bank/calories-bank';
import {AppPreferences} from "@ionic-native/app-preferences";
import {HelpCaloriesBankPageModule} from "../pages/help-calories-bank/help-calories-bank.module";
import {ComponentsModule} from "../components/components.module";

locale('he');

@NgModule({
  declarations: [
    MyApp,
    ItemDetailsPage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: 'חזרה',
    }),
    IonicStorageModule.forRoot({
      name: '__daliadb',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    }),
    HomePageModule,
    HelpCaloriesBankPageModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ItemDetailsPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ActivityStorageProvider,
    AppPreferences,
    PredefinedActivityProvider,
    SettingsProvider,
    ListGeneratorProvider,
    ActionsGeneratorProvider,
    CaloriesBankProvider,
  ]
})
export class AppModule {}
