import { Component, NgZone } from "@angular/core";
import { ModalController, NavController, Platform } from 'ionic-angular';  
import { ReminderService } from '../../services/reminder.service';  
import { EditDetailPage } from '../editdetail/editdetail';

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})
export class EditPage {  
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

    editDetail(reminder) {
        let modal = this.modalCtrl.create(EditDetailPage, { reminder: reminder });
        modal.present();
       
    }

}