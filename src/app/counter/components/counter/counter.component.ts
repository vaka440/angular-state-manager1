import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICount } from '../../models/i-count';
import { StoreCountService } from '../../services/store-count.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent implements OnInit {
  count$: Observable<ICount[]> = this.storeCountService.values$;

  constructor(private storeCountService: StoreCountService) {}

  ngOnInit(): void {
    this.storeCountService.inc(); // on appelle 3 fois l'incrémentation
    this.storeCountService.inc();
    this.storeCountService.inc();
  }
}
