import {Item} from '../model/Item';

export class FurnitureCacheService {

public furnitureCache = new Map();

addInCache(furniture: Item): void {
this.furnitureCache.set(furniture.id, furniture);
}

}
