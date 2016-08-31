import {Injectable} from '@angular/core';
declare let marketcloud:any;
@Injectable()
export class MarketProvider {
  market:any;
  constructor() {
    marketcloud.public = "9c7ef560-5f8b-4d53-a12f-e9d9333a3cef";
    this.market = marketcloud;
  };
  
  getMarketCloud() {
    return this.market;
  }
  
  getCategories() {
    let promise = new Promise((resolve, reject) =>{
     this.market.categories.list({}, (error, categories) => {
       if(categories) {
         resolve(categories);
       } else {
         reject(error);
       }
     });
    })
    return promise;
  };
  
  getProducts(categoryID) {
    let promise = new Promise((resolve, reject) =>{
      this.market.products.list({category_id: categoryID}, (error, products) => {
        if(products) {
          resolve(products);
        } else {
          reject(error);
        }
      });
    });
    
    return promise;
  };
}

