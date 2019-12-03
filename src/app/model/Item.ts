import {Dimension} from './dimension';

git push gooimport {Dimension} from './dimension';

export class Item {
    id = '';
    price = 0;
    name = '';
    description = '';
    images: Array<any> = []; // link images
    collectionId = '';
    dimension:  Dimension | {height: 0, depth: 0, width: 0};
    combinations: Array<Combination> = [];
}

export class Combination {
    id: string;
    colour: string | HexColor;
    style: Style;
    material: Material;
    categoryItem: string;
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

gle master
