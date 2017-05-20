import { Component, ViewChild } from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar,Splashscreen } from 'ionic-native';


import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { ShowDetailPage } from '../pages/showdetail/showdetail';
import { EditDetailPage } from '../pages/editdetail/editdetail';
import { EditPage } from '../pages/edit/edit';
import { ContactPage } from '../pages/contact/contact';
import { ContactDetail } from '../pages/contactdetail/contactdetail';
import { SettingPage } from '../pages/setting/setting';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage = HomePage;

  pages: Array<{title: string, component: any,icon: string}>;

  constructor(public platform: Platform) {

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage,icon:'home' },
      { title: 'Edit Task',component: EditPage,icon:'construct'},
      { title: 'Contact', component: ContactPage, icon:'body' },
      { title: 'Setting', component: SettingPage, icon:'settings' }
    ];

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
