import { Injectable } from '@angular/core';
import { ITodo } from '../models/i-todo';
import { BaseStoreService } from '../../core/store/base-store.service';

@Injectable({
  providedIn: 'root',
})
export class StoreTodoService extends BaseStoreService<ITodo> {   // add here the model
  getTypeName(): string {
    return 'ITodo';                                               // for DEV mode, add here the name of the model
  }

  getInitial(): Array<ITodo> {
    //   
    // initialize here something empty (an array, an object...)
    // or use an api to initialize with the received data 
    //
    return [];    // initialized with an empty array
                  // this must always return an array
  }

  // modify a property of the model
  // as it is a particular action which is not part of the basic actions like (ADD, REMOVE, UPDATE...)
  //
  // it is to update the property : isCompleted
  setCompleted(id: string, isCompleted: boolean) {
    let todo: ITodo | undefined = this.values.find((v: ITodo) => v.id === id);
    if (todo) {
      todo.isCompleted = isCompleted;
      this.update(todo, 'COMPLETED');   // we call update, a function of the abstract class
                                        // a particular action therefore a particular name : 'COMPLETED'
    }
  }
}
