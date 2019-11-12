import {Injectable} from '@angular/core';
import {Item} from '../model/Item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  Items = Array<Item>();
  order: Order = null;

  constructor() {
    if(order==null){
      //fill fields
    this.order = {}
    }
  }
  
  calculateTotal(): number{
    let total = 0;
  for(let f of this.order.furnitures){
  total += f.price;
  }
    return total;
  }
  
  calculateShipmentCost(): number{
    return 0;
  }
}
