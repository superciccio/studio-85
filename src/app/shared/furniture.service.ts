import {Injectable} from '@angular/core';
import {Collection} from '../model/collection';
import {Observable} from 'rxjs';
import { Item } from '../model/Item';
import {AngularFirestore, DocumentSnapshot, QuerySnapshot} from '@angular/fire/firestore';
import {Filter} from '../model/filter';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private db: AngularFirestore) {
  }

  getFurnitures(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Item>('furnitures', ref => ref.orderBy('name', "asc")).get();
  }

  getFurnituresByCollectionId(idCollection: string): Promise<QuerySnapshot<any>> {
    return this.db.collection<Item>('furnitures').ref.where('collectionId', '==', idCollection).orderBy('name', 'asc').get();
  }

    getFurnituresBySameCategory(categoryItem: Filter): Promise<QuerySnapshot<any>> {
    return this.db.collection<Item>('furnitures').ref.where('categoryItem', '==', categoryItem)
      .orderBy('name', 'asc').get();
  }

  // @ts-ignore
  getFurniture(idFurniture: string): Promise<DocumentSnapshot> {
    console.log('getFurniture');
     return this.db.collection<Item>('furnitures').ref.doc(idFurniture).get({source: 'cache'});
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
