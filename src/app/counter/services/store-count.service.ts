import { Injectable } from '@angular/core';
import { BaseStoreService } from '../../core/store/base-store.service';
import { ICount } from '../models/i-count';

@Injectable({
  providedIn: 'root',
})
export class StoreCountService extends BaseStoreService<ICount> {   // add here the model
  getTypeName(): string { 
    return 'ICount';    // for DEV mode, add here the name of the model
  }

  getInitial(): ICount[] {
    //   
    // initialize here something empty (an array, an object...)
    // or use an api to initialize with the received data 
    //
    return [{ value: 0 } as ICount];    // value will contain the current counter value
                                        //  this must always return an array
  }

  // incrementing a value
  // as it is a particular action which is not part of the basic actions like (ADD, REMOVE, UPDATE...)
  //
  // we write here the particular function, for our counter, the increment function
  inc() {
    const obj = this.values[0] as ICount; // as it is not a list, it is an array with a single index which is equal to 0
    if (obj) {
      obj.value++;              // incrementing is carried out

      this.update(obj, 'INC');  // we call update, a function of the abstract class
                                // a particular action therefore a particular name : 'INC'
    }
  }
}
