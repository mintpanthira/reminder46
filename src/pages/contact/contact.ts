import { Component, NgZone } from "@angular/core";
import { ModalController, NavController, Platform,ViewController } from 'ionic-angular';  
import { ContactService } from '../../services/contact.service';
import { AddConPage } from '../addCon/addCon'; 
import { ContactDetail } from '../contactdetail/contactdetail'; 


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {  
    public contact = [];
    addPage = AddConPage;
    constructor(private contactService: ContactService,
        private nav: NavController,
        private platform: Platform,
        private zone: NgZone,
        private modalCtrl: ModalController,
        private viewCtrl: ViewController) {

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
    }

    Addpage(contact) {
        this.nav.push(AddConPage);
    }
    delete(contact) {
        this.contactService.delete(contact)
            .catch(console.error.bind(console));

      
    }
     showDetail(contact) {
        let modal = this.modalCtrl.create(ContactDetail, { contact: contact });
        modal.present();
       
    }

    
}