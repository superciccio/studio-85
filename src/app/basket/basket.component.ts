import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasketService} from '../shared/basket.service';
import {Item} from '../model/Item';
import {Order} from '../model/order';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {

 order: Order;
 empty = true;
  total = 0;

  constructor(private basket: BasketService) {
    this.order = this.basket.order;
    this.empty = this.order.furnitures.size === 0;

    const items = this.order.furnitures.values();
    for (const i of items) {
      if (typeof i.price === 'string') {
        this.total += Number.parseInt(i.price, 0);
      }
    }
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.total = 0;
  }

}
