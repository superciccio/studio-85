import {Component, OnInit} from '@angular/core';
import {BasketService} from '../shared/basket.service';
import {Item} from '../model/Item';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  items: Item[];

  constructor(private basket: BasketService) {
    this.items = this.basket.Items;
  }

  ngOnInit() {
  }

}
