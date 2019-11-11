import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Collection} from '../model/collection';
import {Observable} from 'rxjs';
import { Item } from '../model/Item';
import { environment } from 'src/environments/environment';
import {AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {

  constructor(private db: AngularFirestore) {
  }

  getFurnitures(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Item>('furnitures').get();
  }

  getFurnituresByCollectionId(idCollection: string): Promise<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Collection>('furnitures').ref.where('collectionId', '==', idCollection).get();
  }

  getFurniture(idFurniture: string): Promise<firebase.firestore.DocumentSnapshot> {
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
