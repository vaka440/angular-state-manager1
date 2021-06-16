import { Injectable } from '@angular/core';
import { ITodo } from '../models/i-todo';
import { BaseStoreService } from '../../core/store/base-store.service';

@Injectable({
  providedIn: 'root',
})
export class StoreTodoService extends BaseStoreService<ITodo> {
  // ne pas oublier de nommer le type, cela va servir pour le mode DEV
  getTypeName(): string {
    return 'ITodo';
  }

  getInitial(): Array<ITodo> {
    // pour l'initialisation d'une liste, toujours retourner un tableau vide
    return [];
  }

  // si on a une action particulière à faire (qui ne fait pas partie des actions de base comme : ADD, REMOVE...)
  // elle est spécifique à Todo, on est dans le service todo
  // donc on l'a met ici
  setCompleted(id: string, isCompleted: boolean) {
    let todo: ITodo | undefined = this.values.find((v: ITodo) => v.id === id);
    if (todo) {
      todo.isCompleted = isCompleted;
      this.update(todo, 'COMPLETED');
    }
  }
}
