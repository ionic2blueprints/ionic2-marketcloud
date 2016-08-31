import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {AuthPage} from '../auth/auth';
import {OrderPage} from '../order/order';
import {CartProvider} from '../../providers/cart-provider/cart-provider';
import {UserProvider} from '../../providers/user-provider/user-provider';
import {StorageProvider} from '../../providers/storage-provider/storage-provider';
import {UtilProvider} from '../../providers/util-provider/util-provider';

@Component({
  templateUrl: 'build/pages/cart/cart.html',
})
export class CartPage {
  cart:any;
  isExist:Boolean;
  items:Array<any>;
  total:number = null;
  constructor(public cartProvider:CartProvider, 
              public userProvider: UserProvider, 
              public  nav: NavController, 
              public storage: StorageProvider, 
              public util:UtilProvider) {
  }

  ionViewWillEnter() {
    this.isExist = this.cartProvider.isCartExist();
    if(this.isExist) {
       this.cartProvider.getCartContents()
      .then((cartContent:any) => {
        this.cart = cartContent;
        this.items = cartContent.items;
        this.total = this.getTotal(this.items);
      }).catch(error => {
        this.total = this.getTotal();
      }); 
    } else {
      this.reset();
    }
  }
  
  changeQuantity(index, quantity) {
    this.items[index].quantity = quantity;
    this.cartProvider.updateCart(this.items)
    .then((cart:any) => {
      this.total = this.getTotal(cart.items);
    });
  }
  
  removeItem(id) {
    this.cartProvider.removeItem(id)
    .then((cart:any) => {
      this.cart = cart;
      this.items = cart.items;
      this.total = this.getTotal(this.items);
    })
    .catch(() =>{
      this.total = this.getTotal();
    });
  }
  
    
  checkout() {
   if(this.userProvider.isLoggedIn()) {
     this.nav.push(OrderPage, {items: this.items});
   } else {
     this.nav.push(AuthPage);
   }
  }
  
  getTotal(items?) {
    if(items) {
      let total = items.map((x) => {
        return x.price_discount * x.quantity;
      })
      .reduce((pre, curr) =>{
         return pre + curr;
     });  
     return total;
    } else {
      return null;
    }   
  }
  
  reset() {
    this.cart = null;
    this.items = null;
    this.total = null;
  }
}
