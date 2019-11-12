export class Order {
  userId: string = "";
  furnitures: Array<Item> = [];
  total: number = 0;
  shipmentCost: number = 0;
  shipmentAddress: Address = {};
  billingAddress: Address = {};
}
