import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoComponent } from './components/todo/todo.component';

@NgModule({
  declarations: [TodoComponent],
  imports: [CommonModule],
  exports: [TodoComponent],
  providers: [],
})
export class TodoModule {}
