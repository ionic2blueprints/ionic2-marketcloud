import {Component} from '@angular/core';
import {NavController, Events} from 'ionic-angular';
import {Validators, FormBuilder} from '@angular/common';
import {validateEmail} from '../../validators/email';
import {UserProvider} from '../../providers/user-provider/user-provider';
import {UtilProvider} from '../../providers/util-provider/util-provider';
import {StorageProvider} from '../../providers/storage-provider/storage-provider';
@Component({
  templateUrl: 'build/pages/auth/auth.html',
})
export class AuthPage {
  auth:string;
  loginForm:any;
  regForm:any;
  constructor(public nav:NavController, 
              public form:FormBuilder, 
              public util:UtilProvider,
              public userProvider:UserProvider, 
              public storage: StorageProvider, 
              public events:Events) {
    
    this.auth = 'login';
    this.form = form;
    this.loginForm = form.group({
        email: ["",Validators.compose([Validators.required, validateEmail])],
        password:["",Validators.required]
    });
    
    this.regForm = form.group({
        name: ["", Validators.required],
        email: ["",Validators.compose([Validators.required, validateEmail])],
        password:["", Validators.compose([Validators.required, Validators.minLength(8)])]
    });
  }
  
  login(userData?) {
    // If User logins explicitly
    if(!userData) {
      userData = this.loginForm.value;
    } 

    this.userProvider.authUser(userData)
    .then((user)=> {
      this.storage.setObject('user', user);
      this.events.publish('user:logged_in');
      this.nav.pop();
    })
    .catch((error) => {
      let message = error.message;
      let toast = this.util.getToast(message);
      this.nav.present(toast);
    });
  }
  
  register() {
    let user = this.regForm.value; 
    this.userProvider.createUser(user)
    .then(() => {
      delete user.name;
      this.login(user);
    });
  }
  
}

