export class CacheFurniture {

public furnitureCache = new Map();

addInCache(furniture: Item):void{
this.furnitureCache.set(furniture.id, furniture);
}

}
