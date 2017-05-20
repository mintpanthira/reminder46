import { Component} from "@angular/core";
import { ModalController, NavController, Platform } from 'ionic-angular';  
import { ReminderService } from '../../services/reminder.service';  
import { NavParams, ViewController } from 'ionic-angular';  

@Component({
  selector: 'page-showdetail',
  templateUrl: 'showdetail.html'
})
export class ShowDetailPage {  
    public reminder: any = {};
    public isNew = true;
    public action = 'Add';
    public isoDate = '';

    constructor(private viewCtrl: ViewController,
        private navParams: NavParams,
        private reminderService: ReminderService,
        private modalCtrl: ModalController) {
    }

    ionViewDidLoad() {
        let showDetails = this.navParams.get('reminder');

        if (showDetails) {
            this.reminder = showDetails;
            this.isNew = false;
            this.action = 'Details';
            this.isoDate = this.reminder.Date.toISOString().slice(0, 10);
        }
    
    }
    
    delete() {
        this.reminderService.delete(this.reminder)
            .catch(console.error.bind(console));

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.reminder);
    }
}