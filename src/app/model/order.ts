import {Item} from './Item';
import {Address} from './address';

export class Order {
  userId = '';
  furnitures: Array<Item> = [];
  total = 0;
  shipmentCost = 0;
  shipmentAddress: Address = {};
  billingAddress: Address = {};
  shipmentNotes = '';
}
