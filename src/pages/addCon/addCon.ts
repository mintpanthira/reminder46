import { Component, NgZone } from "@angular/core";
import { NavParams, ViewController } from 'ionic-angular';  
import { ModalController, NavController, Platform } from 'ionic-angular';  
import { ContactService } from '../../services/contact.service'; 



@Component({
  selector: 'page-home',
  templateUrl: 'addCon.html'
})
export class AddConPage {  
    public contact: any = {};
    public isNew = true;
    public action = 'Add';


    constructor(private viewCtrl: ViewController,
        private navParams: NavParams,
        private contactService: ContactService) {

    }

    ionViewDidLoad() {
         let editContact = this.navParams.get('contact');

        if (editContact) {
            this.contact = editContact;
            this.isNew = false;
            this.action = 'Edit';
        }
    }
    

    addcon() {


        if (this.isNew) {
            this.contactService.add(this.contact)
                .catch(console.error.bind(console));
        } else {
            this.contactService.update(this.contact)
                .catch(console.error.bind(console));
        }

        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.contact);
    }


    

    

    
}