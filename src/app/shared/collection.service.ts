import {Injectable} from '@angular/core';
import {Collection} from '../model/collection';
import {Observable} from 'rxjs';
import {AngularFirestore, DocumentSnapshot, QuerySnapshot} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private db: AngularFirestore) {
  }

  getCollections(): Observable<QuerySnapshot<any>> {
    return this.db.collection<Collection>('collections').get();
  }

  getHomeCollections(): Promise<QuerySnapshot<any>> {
    return this.db.collection<Collection>('collections').ref.where('isInHomePage', '==', true).get();
  }

  // @ts-ignore
  getCollectionById(idCollection: string): Observable<DocumentSnapshot> {
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
