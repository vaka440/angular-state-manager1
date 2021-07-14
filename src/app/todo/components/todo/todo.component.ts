import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from '../../models/i-todo';
import { StoreTodoService } from '../../services/store-todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  values$: Observable<ITodo[]> = this.storeTodoService.values$;

  constructor(private storeTodoService: StoreTodoService) {}

  ngOnInit() {
    //
    console.log('add todo1 --------------------------');
    const todo1 = { title: 'do1', isCompleted: false } as ITodo;
    this.storeTodoService.add(todo1);
    //
    console.log('remove todo1 --------------------------');
    this.storeTodoService.remove(todo1);
    //
    console.log('add todo1 todo2 --------------------------');
    const todo2 = { title: 'do2', isCompleted: false } as ITodo;
    this.storeTodoService.add(todo1);
    this.storeTodoService.add(todo2);
    //
    console.log('findbyId --------------------------');
    const ftodo2 = this.storeTodoService.findById(todo2.id);
    console.log('todo trouvé : ', ftodo2);
    console.log();
    //
    console.log('setCompleted --------------------------');
    if (ftodo2) {
      this.storeTodoService.setCompleted(ftodo2.id, true);
    }
  }

  displayConsole() {
    console.log();
    console.log('affichage', this.storeTodoService.values);
  }

}
