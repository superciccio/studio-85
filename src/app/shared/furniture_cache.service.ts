import {Item} from '../model/Item';
import { Injectable } from "@angular/core";

@Injectable()
export class FurnitureCacheService {

public furnitureCache = new Map();

addInCache(furniture: Item): void {
this.furnitureCache.set(furniture.id, furniture);
}

}
