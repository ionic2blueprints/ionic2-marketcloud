import {Injectable} from '@angular/core';

@Injectable()
export class StorageProvider {
  storage = localStorage;
  get(key) {
    return this.storage.getItem(key);
  }
  
  set(key, value) {
    this.storage.setItem(key, value);
  }
  
  getObject(key) {
    let value = this.get(key);
    let returnValue;
    if(value) {
      returnValue = JSON.parse(value);
    } else {
      returnValue = null;
    }
    return returnValue;
  }
  
  setObject(key, value) {
    this.storage.setItem(key, JSON.stringify(value));
  }
  
  remove(key) {
    this.storage.removeItem(key);
  }
}

