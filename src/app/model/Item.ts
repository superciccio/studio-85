import {Dimension} from './dimension';
import {Filter} from './filter';

export class Item {
    id = '';
    price: number;
    name = '';
    description = '';
    images: Array<string> = []; // link images
    smallImages: Array<string> = []; // link images
    collectionId = '';
    categoryItem: Filter;
    materialId: string | Material;
    dimension: Dimension | {height: 0, depth: 0, width: 0};
    combinations: Array<Combination> = [];
}

export class Combination {
    id: string;
    colour: string | HexColor | null;
    style: Filter | null ;
    material: Material | null | string;
    images: Array<string> = []; // link images
    dimension: Dimension;
}

export class HexColor {
    id: string;
    value: string;
}

export class Style {
    id: string;
    name: string;
}

export class Material {
    id: string;
    name: string;
}
