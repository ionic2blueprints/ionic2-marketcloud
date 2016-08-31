import {Page, NavController, NavParams} from 'ionic-angular';
import {Validators, FormBuilder} from '@angular/common';
import {validateEmail} from '../../validators/email';
import {CartProvider} from '../../providers/cart-provider/cart-provider';
import {UserProvider} from '../../providers/user-provider/user-provider';
import {UtilProvider} from '../../providers/util-provider/util-provider';

@Page({
  templateUrl: 'build/pages/order/order.html',
})
export class OrderPage {
  address = {};
  items:any;
  addressForm:any;
  constructor(public nav:NavController, 
              public form: FormBuilder, 
              public cartProvider: CartProvider, 
              public params: NavParams, 
              public userProvider: UserProvider, 
              public util: UtilProvider) {
    this.items = params.get('items');    
    this.userProvider.getAddress()
    .then((address) => {
      this.address = address[0];
    }).catch((data)=> {
      console.log("No Address Added for User", data);
    });
    
    this.addressForm = form.group({
      full_name: ["", Validators.required],
      email: ["",Validators.compose([Validators.required, validateEmail])],
      country:["", Validators.required],
      state: ["", Validators.required],
      city: ["", Validators.required],
      address1:["", Validators.required],
      postal_code:["", Validators.required]
    });    
  }
  
  processOrder() {
    let promise;
    let order_id;
    let nonce;
    if(this.address) {
      Object.keys(this.address).forEach(key => {
        if(this.address[key] == null) {
          delete this.address[key];
        }
      });
      promise = this.cartProvider.createOrder(this.items, this.address);
    } else {
      promise = this.userProvider.createAddress(this.addressForm.value)
      .then((address) => {
        return this.cartProvider.createOrder(this.items, address);
      });
    }
    
    promise.then((order) => {
      order_id = order.id;
      this.cartProvider.setCartID(null);
      return this.cartProvider.getPayment(order.total, this.addressForm.value.full_name);
    })
    .then((data) => {
      nonce = data.nonce;
      this.cartProvider.createPayment(order_id, nonce)
      .then(data => {
        let toast = this.util.getToast('Order is succesfull');
        this.nav.present(toast);
        this.address = {};
        this.nav.popToRoot();
      });
      
    });   
  }
}
