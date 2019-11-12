import {Dimension} from './dimension';

export class Item {
  id: string = "";
  price: number = 0;
  name: string = "";
  description: string = "";
  images: Array<any> = []; // link images
  collectionId: string = "";
  categoryItem: string = "";
  dimension: Dimension | null = {height=0,depth=0,width=0};
  material: string = "";
}

