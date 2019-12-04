import {Injectable} from '@angular/core';
import {Collection} from '../model/collection';
import {Observable} from 'rxjs';
import { Item } from '../model/Item';
import {AngularFirestore, DocumentSnapshot, QuerySnapshot} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private db: AngularFirestore) {
  }

  getFurnitures(): Observable<QuerySnapshot<any>> {
    return this.db.collection<Item>('furnitures').get();
  }

  getFurnituresByCollectionId(idCollection: string): Promise<QuerySnapshot<any>> {
    return this.db.collection<Item>('furnitures').ref.where('collectionId', '==', idCollection).get();
  }
  
    getFurnituresBySameCategory(categoryItem: string): Promise<QuerySnapshot<any>> {
    return this.db.collection<Item>('furnitures').ref.where('categoryItem', '==', categoryItem).get();
  }

  // @ts-ignore
  getFurniture(idFurniture: string): Promise<DocumentSnapshot> {
    return this.db.collection<Item>('furnitures').ref.doc(idFurniture).get();
  }
  save(item: Item) {
    if (item.id === '') {
      item.id =  this.db.createId();
      return this.db.collection('furnitures').doc(item.id).set(item);
    } else {
      return this.db.collection('furnitures').doc(item.id).update(item);
    }
  }

  deleteFurniture(idFurniture: string): Promise<void> {
    return this.db.collection('furnitures').doc(idFurniture).delete();
  }
}
