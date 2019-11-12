import {Dimension} from './dimension';

export class Item {
  id = '';
  price = 0;
  name = '';
  description = '';
  images: Array<any> = []; // link images
  collectionId = '';
  categoryItem = '';
  dimension: Dimension | null = {height: 0, depth: 0, width: 0};
  material = '';
}

