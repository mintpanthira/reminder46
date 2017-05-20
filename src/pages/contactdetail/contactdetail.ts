import { NavParams, ViewController } from 'ionic-angular';  
import { ContactService } from '../../services/contact.service';
import { ReminderService } from '../../services/reminder.service'; 
import { Component, NgZone } from "@angular/core";
import { ModalController, NavController, Platform } from 'ionic-angular';


@Component({
  selector: 'page-contactdetail',
  templateUrl: 'contactdetail.html'
})
export class ContactDetail {  
    public contact: any = {};
    public isNew = true;

    constructor(private viewCtrl: ViewController,
        private navParams: NavParams,
        private contactService: ContactService) {
    }

    ionViewDidLoad() {
        let editContact = this.navParams.get('contact');

        if (editContact) {
            this.contact = editContact;
            this.isNew = false;
        }
    }
    save() {

        if (this.isNew) {
            this.contactService.add(this.contact)
                .catch(console.error.bind(console));
        } else {
            this.contactService.update(this.contact)
                .catch(console.error.bind(console));
        }

        this.dismiss();
    }

    delete() {
        this.contactService.delete(this.contact)
            .catch(console.error.bind(console));

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.contact);
    }
}