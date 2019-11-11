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
export class CollectionService {

  constructor(private db: AngularFirestore) {
  }

  getCollections(): Observable<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Collection>('collections').get();
  }

  getHomeCollections(): Promise<firebase.firestore.QuerySnapshot> {
    return this.db.collection<Collection>('collections').ref.where('isInHomePage', '==', true).get();
  }

  getCollectionById(idCollection: string): Observable<firebase.firestore.DocumentSnapshot> {
    return this.db.collection('collections').doc(idCollection).get();
  }

  save(item: Collection): Promise<void> {
    if (item.id === '') {
     item.id =  this.db.createId();
     return this.db.collection('collections').doc(item.id).set(item);
    } else {
      return this.db.collection('collections').doc(item.id).update(item);
    }
  }

  deleteCollection(idCollection: string) {
    console.log(`delete collection with ${idCollection} `);
  }
}
