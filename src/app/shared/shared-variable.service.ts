import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedVariableService {

  private isLogged = new Subject<boolean>();

  private CATEGORY_FURNITURES = ['Cabinet', 'Table', 'Bar station', 'Sideboard', 'Bedside table'];

  constructor() {
  }

  getLogged(): Observable<boolean> {
    return this.isLogged.asObservable();
  }

  updateLogged(logged: boolean) {
    this.isLogged.next(logged);
  }

  getCategoriesFurniture() {
    return this.CATEGORY_FURNITURES;
  }
}
