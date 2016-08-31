import {Component} from '@angular/core';
import { Modal,NavParams, ViewController,NavController} from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/image-modal/image-modal.html',
})
export class ImageModal {
  images:any;
  constructor(public viewCtrl: ViewController, public params: NavParams) {
   this.images = this.params.get('images');
  }
  
  close() {
    console.log("Closing Modal");
    this.viewCtrl.dismiss();
  }
}
