import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import { Filter } from '../model/filter';
import {AngularFirestore, QuerySnapshot} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SharedVariableService {

  private isLogged = new Subject<boolean>();

  private CATEGORY_FURNITURES = ['Cabinet', 'Table', 'Bar station', 'Sideboard', 'Bedside table'];

  constructor(private db: AngularFirestore) {
  }

  getLogged(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  updateLogged(logged: boolean) {
    this.isLogged.next(logged);
  }

  getFilters(): Observable<QuerySnapshot<any>> {
    return this.db.collection<Filter>('filters').get();
  }
}
