import { Injectable } from '@angular/core';
import { BaseStoreService } from '../../core/store/base-store.service';
import { ICount } from '../models/i-count';

@Injectable({
  providedIn: 'root',
})
export class StoreCountService extends BaseStoreService<ICount> {
  getTypeName(): string {
    // pour le mode DEV, toujours renvoyer le type
    return 'ICount';
  }

  getInitial(): ICount[] {
    // ici, il faut toujours retourner un tableau de quelquechose. Dans ce service c'est un tableau de ICount

    return [{ value: 0 } as ICount];
  }

  // incrémentation d'une valeur
  // comme c'est une action particulière qui ne fait pas partie des actions de bases comme (ADD, REMOVE, UPDATE...)
  // on surcharge en écrivant ici la fonction
  inc() {
    const obj = this.values[0] as ICount; // comme ce n'est pas une liste, c'est un tableau avec un seul index qui est égal à 0
    if (obj) {
      obj.value++; // on effectue l'action ici, on incrémente

      this.update(obj, 'INC'); // on fait appelle à update de la classe abstraite : BaseStoreService
      // en précisant le nom de l'action : 'INC'
    }
  }
}
