import {Component, ViewChild, provide, enableProdMode} from '@angular/core';
import {Platform, Nav, Events, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {StorePage} from './pages/store/store';
import {CartPage} from './pages/cart/cart';
import {MarketProvider} from './providers/market-provider/market-provider';
import {CartProvider} from './providers/cart-provider/cart-provider';
import {StorageProvider} from './providers/storage-provider/storage-provider';
import {UserProvider} from './providers/user-provider/user-provider';
import {UtilProvider} from './providers/util-provider/util-provider';
declare let marketcloud:any;
@Component({
  templateUrl: 'build/app.html',
})
class MyApp {
  rootPage: any = StorePage;
  pages: Array<{title: string, component: any}>
  isLoggedIn = false;
  @ViewChild(Nav) nav:Nav;
  constructor(private platform: Platform, 
  public cartProvider:CartProvider, 
  public market: MarketProvider, 
  public storage: StorageProvider, 
  public events:Events,
  public userProvider: UserProvider) {
    this.initializeApp();
    this.pages = [
      { title: 'Categories', component: StorePage },
      { title: 'Cart', component: CartPage}
    ];

    events.subscribe('user:logged_out', () => {
       this.isLoggedIn = false;
    });
    
    events.subscribe('user:logged_in', () => {
      this.isLoggedIn = true;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      let user = this.storage.getObject('user');
      if(user) {
        this.market.getMarketCloud().token = user.token;
        this.market.getMarketCloud().user = user.user;
        this.isLoggedIn = true;
      }
      this.cartProvider.intializePayments();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
  
  logout() {
    this.userProvider.logout();
    this.events.publish('user:logged_out', {});
  }
}

ionicBootstrap(MyApp, [MarketProvider, CartProvider, StorageProvider, UserProvider, UtilProvider]);
