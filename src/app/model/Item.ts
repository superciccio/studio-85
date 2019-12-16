import {Dimension} from './dimension';

export class Item {
    id = '';
    price = 0;
    name = '';
    description = '';
    images: Array<string> = []; // link images
    collectionId = '';
    categoryItem: string;
    materialId: string | Material;
    dimension: Dimension | {height: 0, depth: 0, width: 0};
    combinations: Array<Combination> = [];
}

export class Combination {
    id: string;
    colour: string | HexColor | null;
    style: Style | null | string;
    material: Material | null | string;
    images: Array<string> = []; // link images
    dimension: Dimension | string;
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
