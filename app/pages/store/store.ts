import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {MarketProvider} from '../../providers/market-provider/market-provider';
import {UtilProvider} from '../../providers/util-provider/util-provider';
import {CategoryPage} from '../category/category';
@Component({
  templateUrl: 'build/pages/store/store.html'
})
export class StorePage {
  categories:any;
  constructor(public market: MarketProvider, public nav:NavController, public util:UtilProvider) {
    this.market.getCategories()
    .then((data) => {
       this.categories = data;
    });
  }

  openProducts(category) {
    this.nav.push(CategoryPage, {category: category});
  }
}
