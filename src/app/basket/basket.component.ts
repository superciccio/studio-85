import {Component, OnInit} from '@angular/core';
import {BasketService} from '../shared/basket.service';
import {Item} from '../model/Item';
import {Order} from '../model/order';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

 order: Order;
 empty = true;

  constructor(private basket: BasketService) {
    this.order = this.basket.order;
    this.empty = this.order.furnitures.size > 0;
  }

  ngOnInit() {
  }

}
