import {Dimension} from './dimension';

export class Item {
  id: string;
  price: number;
  name: string;
  description: string;
  images: Array<any>; // link images
  collectionId: string;
  categoryItem: string;
  dimension: Dimension | null;
}
