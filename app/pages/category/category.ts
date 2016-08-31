import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UtilProvider} from '../../providers/util-provider/util-provider';
import {MarketProvider} from '../../providers/market-provider/market-provider';
import {ProductPage} from '../product/product';
@Component({
  templateUrl: 'build/pages/category/category.html'
})
export class CategoryPage {
  category:any;
  loading:any;
  products:any;
  totalProducts:{};
  constructor(public nav: NavController,
              public params: NavParams, 
              public market: MarketProvider, 
              public util:UtilProvider) {
     this.category = this.params.get('category');  
     this.loading = this.util.presentLoading("Loading Products ...");
     this.nav.present(this.loading);  
     this.market.getProducts(this.category.id)
     .then((data) => {
       this.products = data;
       this.totalProducts = data;
       this.loading.dismiss();
    });
  }
  
  openProduct(product) {
     console.log("Opening Product");
     this.nav.push(ProductPage, {product: product});
  }
  
  searchProducts(searchbar) {
    console.log(searchbar.value);
    this.products = this.totalProducts;
    let searchValue = searchbar.value;
    if(searchValue.trim() == "") {
      return;
    }
    this.products =  this.products.filter((product) => {
      if(product.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1) {
        return true;
      }
      return false;
    });
    
  }
}
