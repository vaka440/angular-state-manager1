import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { uuid } from './uuid';
import { environment } from '../../../environments/environment';

export interface Base {
  id: string;
}

export interface INotif<T extends Base> {
  action: 'ADD' | 'REMOVE' | 'UPDATE' | 'COMPLETED';
  item: T | string;
  items: Array<T>;
}

@Injectable({
  providedIn: 'root',
})
export abstract class BaseStoreService<T extends Base> {
  // Gestion de l'état
  private readonly _values = new BehaviorSubject<T[]>(this.getInitial());
  readonly values$ = this._values.asObservable();

  get values(): T[] {
    return this._values.getValue();
  }

  set values(val: T[]) {
    this._values.next(val);
  }

  // Gestion d'une notification pour le mode développement
  private _notifs: Array<INotif<T>> = [];

  get notifs(): INotif<T>[] {
    return this._notifs;
  }

  addNotif(notif: INotif<T>) {
    this.notifs.push(notif);
  }

  // on déclare les fonctions en abstract pour pouvoir les redéfnier dans : StoreTodoService et StoreCountService
  abstract getTypeName(): any;

  abstract getInitial(): any;

  //  Les actions de base : ADD, REMOVE, UPDATE, FINDBYID...
  add(value: T) {
    if (value) {
      value.id = uuid();
      this.values = [...this.values, value];

      this.devMode('ADD', value);
    }
  }

  remove(value: T) {
    this.values = this.values.filter((v: T) => v.id !== value.id);
    this.values = [...this.values];

    this.devMode('REMOVE', value);
  }

  update(value: T, devName = '') {
    const index = this.values.indexOf(value);

    this.values[index] = {
      ...value,
    };

    this.values = [...this.values];

    this.devMode('UPDATE ' + devName, value);
  }

  findById(id: string): T | undefined {
    return this.values.find((v: T) => v.id === id);
  }

  // en mode DEV, on affiche dans la console l'action qui a été réalisé (pour le débuggage)
  devMode(action: string, item: T | string) {
    if (environment.storeInDevMode) {
      const notif = {
        action: action,
        item: item,
        items: this.values,
      } as INotif<T>;
      this.addNotif(notif);
      console.log();
      console.log(
        'DEV MODE : ' + this.getTypeName(),
        this.notifs
      );
    }
  }
}
