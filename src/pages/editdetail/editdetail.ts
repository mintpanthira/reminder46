import { NavParams, ViewController } from 'ionic-angular';  
import { ReminderService } from '../../services/reminder.service'; 
import { Component, NgZone } from "@angular/core";
import { ModalController, NavController, Platform } from 'ionic-angular';
import { ContactService } from '../../services/contact.service';

@Component({
  selector: 'page-editdetail',
  templateUrl: 'editdetail.html'
})
export class EditDetailPage {  
    public reminder: any = {};
    public contact = [];
    public category: Array<{cat: string}>;
    public isNew = true;
    public action = 'Add';
    public isoDate = '';

    constructor(private contactService: ContactService,
        private viewCtrl: ViewController,
        private navParams: NavParams,
        private reminderService: ReminderService,
        private platform: Platform,
        private zone: NgZone) {
            this.category = [{cat:'Homework'},{cat: 'Quiz'},{cat: 'Project'}];
    }
    ionViewDidLoad() {
            this.platform.ready().then(() => {
            this.contactService.initDB();

            this.contactService.getAll()
                .then(data => {
                    this.zone.run(() => {
                        this.contact = data;
                    });
                })
                .catch(console.error.bind(console));
        });

        let showDetail = this.navParams.get('reminder');

        if (showDetail) {
            this.reminder = showDetail;
            this.isNew = false;
            this.action = 'Edit';
            this.isoDate = this.reminder.Date.toISOString().slice(0, 10);
        }
    
    }
    save() {
        this.reminder.Date = new Date(this.isoDate);

        if (this.isNew) {
            this.reminderService.add(this.reminder)
                .catch(console.error.bind(console));
        } else {
            this.reminderService.update(this.reminder)
                .catch(console.error.bind(console));
        }

        this.dismiss();
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