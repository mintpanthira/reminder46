import { Component, NgZone } from "@angular/core";
import { ModalController, NavController, Platform } from 'ionic-angular';  
import { ReminderService } from '../../services/reminder.service';  
import { DetailsPage } from '../details/details';  

@Component({
  selector: 'page-home',
  templateUrl: 'setting.html'
})
export class SettingPage {  
    public reminders = [];
    public language: Array<{lang: string}>;

    constructor(private reminderService: ReminderService,
        private nav: NavController,
        private platform: Platform,
        private zone: NgZone,
        private modalCtrl: ModalController) {
             this.language = [{lang:'Thai'},{lang: 'English'}];
        
    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.reminderService.initDB();

            this.reminderService.getAll()
                .then(data => {
                    this.zone.run(() => {
                        this.reminders = data;
                    });
                })
                .catch(console.error.bind(console));
        });
    }

    showDetail(reminder) {
        let modal = this.modalCtrl.create(DetailsPage, { reminder: reminder });
        modal.present();
    }
}