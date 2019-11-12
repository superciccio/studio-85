import {Injectable} from '@angular/core';
import {Item} from '../model/Item';
import {Order} from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  Items = Array<Item>();
  order: Order = null;

  constructor() {
    if (this.order == null) {
      // fill fields
    this.order = {
      billingAddress: null,
      furnitures: [],
      shipmentAddress: null,
      shipmentCost: 0,
      shipmentNotes: '',
      total: 0,
      userId: ''
    };
    }
  }

  calculateTotal(): number {
    let total = 0;
    for (const f of this.order.furnitures) {
  total += f.price;
  }
    return total;
  }

  calculateShipmentCost(): number {
    return 0;
  }
}
