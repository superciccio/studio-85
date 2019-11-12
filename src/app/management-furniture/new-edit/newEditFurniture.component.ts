import {Component, OnInit} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/model/collection';
import { CollectionService } from 'src/app/shared/collection.service';
import { Item } from 'src/app/model/Item';
import {FurnitureService} from '../../shared/furniture.service';
import {MatTableDataSource} from '@angular/material/table';
import * as firebase from 'firebase';
import {AngularFireStorage} from '@angular/fire/storage';
import {SharedVariableService} from '../../shared/shared-variable.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-neweditfurniture',
  templateUrl: './newEditFurniture.component.html',
  styleUrls: ['./newEditFurniture.component.scss']
})
export class NewEditFurnitureComponent implements OnInit {

  isConverting: boolean;
  myControl = new FormControl();
  options: Collection[] = [];
  filteredOptions: Observable<Collection[]>;

  collections: Array<Collection> = [];

  item: Item;
  loading = false;

  fd = new FormData();
  files: Array<File> = [];
  conversionDone = false;
  categoriesFurniture: string[] = [];
  formCategoryItem = '';
  id = '';
  formattedAmount;

  constructor(private aRoute: ActivatedRoute, private router: Router, private cService: CollectionService, private fService: FurnitureService,
              private fstorage: AngularFireStorage, private service: SharedVariableService,
              private snackBar: MatSnackBar, private currencyPipe: CurrencyPipe) {
    this.categoriesFurniture = service.getCategoriesFurniture();
    this.id = this.aRoute.snapshot.params.id;
    this.item = {
      id: '',
      price: 0,
      collectionId: '',
      description: '',
      images: [],
      name: '',
      material: '',
      categoryItem: '',
      dimension : {
        depth: 0,
        width: 0,
        height: 0
      }
    };
  }

  ngOnInit() {
    this.collections = [];
    this.loading = true;
    this.cService.getCollections().toPromise().then(resp => {
      for (const doc of resp.docs) {
        this.options.push(doc.data() as Collection);
      }
      this.loading = false;
    });
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    if (this.id !== undefined && this.id.length > 0) {
      this.loading = true;
      this.fService.getFurniture(this.id).then(resp => {
        this.item = resp.data() as Item;
        if (this.item.dimension == null) {
          this.item.dimension = {
            width : 0,
            depth: 0,
            height: 0
          };
        }
        if (this.item.material==null) {
            this.item.material = '';
        }
        const collection = this.options.find(c => c.id === this.item.collectionId);
        this.myControl.setValue(collection.name);
        this.loading = false;
      });
    }
  }

  transformAmount(element) {
    this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, '£');

    element.target.value = this.formattedAmount;
  }

  compareCategoryObjects(object1: string, object2: string) {

    return object1 === object2;
  }

  private _filter(value: string): Collection[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);

  }

 back() {
   this.router.navigate(['/management']);
 }

  public async fileChange(files: FileList) {
    if (this.item.name === '') {
      alert('Please specify a name first');

    } else {
      for (let i = 0; i < files.length; i++) {
        this.files.push(files.item(i));
      }
      this.isConverting = true;

      for (const f of this.files) {


        await this.fstorage.ref(`/temp${this.item.name}`).child(f.name).put(f).then((resp) => {

          const convert = firebase.functions().httpsCallable('pippo');

          convert({collectionName: this.item.name, filename: f.name}).then(respcallback => {
            this.item.images.push(respcallback.data);
          });

        });
      }
      this.isConverting = false;
      this.conversionDone = true;
    }
  }

    save() {
    const collection = this.options.find(c => c.name === this.myControl.value);
    this.item.collectionId = collection.id;
    this.snackBar.open('saving, do not close the page. Please wait', '', {duration: 500});

    this.fService.save(this.item).then(() => {
        this.snackBar.open('Collection saved.');
      });
 }
}
