import {Component} from '@angular/core';
import {Modal, Loading, NavController, NavParams} from 'ionic-angular';
import {MarketProvider} from '../../providers/market-provider/market-provider';
import {CartProvider} from '../../providers/cart-provider/cart-provider';
import {UtilProvider} from '../../providers/util-provider/util-provider';
import {ImageModal} from '../image-modal/image-modal';
import {CartPage} from '../cart/cart';

@Component({
  templateUrl: 'build/pages/product/product.html',
})
export class ProductPage {
  quantity:number;
  product:any;
 constructor(public nav: NavController,
             public params: NavParams, 
             public market: MarketProvider, 
             public cartProvider:CartProvider, 
             public util:UtilProvider) {
    this.quantity = 1;
    // This is the Actual Product Content 
    this.product = this.params.get('product');
    
  }
  
  addToCart(productId) {
    let loading = this.util.presentLoading("Adding to Cart");
    this.nav.present(loading);
    this.cartProvider.addToCart(productId, this.quantity)
    .then((data)=>{
      loading.dismiss();
      console.log(data);
    });
  }
  
  openImages() {
    let modal = Modal.create(ImageModal,{images: this.product.images});
    this.nav.present(modal);
  }
  
  openCart() {
    this.nav.push(CartPage);
  }
}
