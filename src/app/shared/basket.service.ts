import {Injectable} from '@angular/core';
import {Item} from '../model/Item';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  Items = Array<Item>();

  constructor() {
  }
}
