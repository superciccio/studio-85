import {Component, OnDestroy, OnInit} from '@angular/core';
import {BasketService} from '../shared/basket.service';
import {Item} from '../model/Item';
import {Order} from '../model/order';
import {Title} from '@angular/platform-browser';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {

 order: Order;
 empty = true;
  total = 0;
  displayedColumns: string[] = ['img', 'name', 'price', 'action'];
  tableFooterColumns: string[] = ['total'];

  dataSource = new MatTableDataSource();


  constructor(private basket: BasketService, private titleService: Title) {
    this.order = this.basket.order;
   this.initPage();
  }

  initPage() {
    this.empty = this.order.furnitures.size === 0;

    const items = this.order.furnitures.values();
    const fList = [];
    for (const i of items) {
      this.total +=  i.price;
      fList.push(i);
    }
    this.dataSource = new MatTableDataSource(fList);
  }

  ngOnInit() {
    this.titleService.setTitle(`Studio 85 - basket`);
  }

  removeFurniture(id: string) {
    this.basket.order.furnitures.delete(id);
    this.initPage();
  }

  ngOnDestroy(): void {
    this.total = 0;
  }

}
