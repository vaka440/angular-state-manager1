import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { StoreTodoService } from './todo/services/store-todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'angular-state-management';

  constructor(private storeTodoService: StoreTodoService) {}

  ngOnInit() {}

  test() {}
}
