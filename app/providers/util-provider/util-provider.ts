import {Injectable} from '@angular/core';
import {Alert, Loading, Toast} from 'ionic-angular';
@Injectable()
export class UtilProvider {
  constructor() {
  }
  doAlert(title, message, buttonText) {
      let alert = Alert.create({
          title: title,
          subTitle: message,
          buttons: [buttonText]
      });
      return alert; 
  }
  
  presentLoading(content) {
    let loading = Loading.create({
      dismissOnPageChange: true,
      content: content
    });
    return loading;
  }

  getToast(message) {
    let toast = Toast.create({
      message: message,
      duration:2000
    });
    return toast;
  }
}

