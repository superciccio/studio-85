import {Injectable} from '@angular/core';
import {Collection} from '../model/collection';
import {Observable} from 'rxjs';
import { Item } from '../model/Item';
import {AngularFirestore, DocumentSnapshot, QuerySnapshot} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ArtisanService {

  constructor(private db: AngularFirestore) {
  }

  getAllArtisan(): Observable<QuerySnapshot<any>> {
    return this.db.collection<Item>('artisans').get();
  }

  getCollectionByArtisan(idUser: string): Promise<QuerySnapshot<any>> {
    return this.db.collection<Collection>('collections').ref.where('idArtisan', '==', idUser).get();
  }

  save(user: User) {
    return this.db.collection('artisans').doc(user.uid).set(user);
  }

  deleteUser(idUser: string): Promise<void> {
    return this.db.collection('artisans').doc(idUser).delete();
  }
}
