import { Component, NgZone } from "@angular/core";
import { ModalController, NavController, Platform } from 'ionic-angular';  
import { ReminderService } from '../../services/reminder.service';   
import { ShowDetailPage } from '../showdetail/showdetail';  
import { DetailsPage } from '../details/details';  

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {  
    public reminder = [];

    constructor(private reminderService: ReminderService,
        private nav: NavController,
        private platform: Platform,
        private zone: NgZone,
        private modalCtrl: ModalController) {

    }

    ionViewDidLoad() {
        this.platform.ready().then(() => {
            this.reminderService.initDB();

            this.reminderService.getAll()
                .then(data => {
                    this.zone.run(() => {
                        this.reminder = data;
                    });
                })
                .catch(console.error.bind(console));
        });
    }
    AddDetail(reminder) {
        
        let modal = this.modalCtrl.create(DetailsPage, { reminder: reminder });
        modal.present();
    }

    showDetail(reminder) {
        let modal = this.modalCtrl.create(ShowDetailPage, { reminder: reminder });
        modal.present();
       
    }

}