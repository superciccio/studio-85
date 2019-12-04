import {Component, OnInit} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/model/collection';
import { CollectionService } from 'src/app/shared/collection.service';
import {Combination, Item} from 'src/app/model/Item';
import {FurnitureService} from '../../shared/furniture.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {SharedVariableService} from '../../shared/shared-variable.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CurrencyPipe} from '@angular/common';
// @ts-ignore
import firebase from 'firebase/app';
import 'firebase/functions';
import {Filter} from '../../model/filter';

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
  formCategoryItem = '';
  id = '';
  formattedAmount;
  materialFilters: Filter[] = [];
  colourFilters: Filter[] = [];
  styleFilters: Filter[] = [];
  furnitureFilters: Filter[] = [];
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  combinations: Combination[] = [];

  constructor(private aRoute: ActivatedRoute, private router: Router, private cService: CollectionService,
              private fService: FurnitureService,
              private fstorage: AngularFireStorage, private service: SharedVariableService,
              private snackBar: MatSnackBar, private currencyPipe: CurrencyPipe,
              private formBuilder: FormBuilder) {
    // TODO to fix
    // this.categoriesFurniture = service.getCategoriesFurniture();
    this.firstFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      descCtrl: ['', Validators.required],
      collCtrl: [''],
      priceCtrl: ['', Validators.required],
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.id = this.aRoute.snapshot.params.id;
    this.item = {
      id: '',
      price: 0,
      collectionId: '',
      description: '',
      images: [],
      name: '',
      materialId: '',
      categoryItem: '',
      combinations: [],
      dimension : {
        depth: 0,
        width: 0,
        height: 0
      },
    };
  }

  ngOnInit() {
    this.collections = [];
    this.loading = true;
    this.service.getFilters().toPromise().then(resp => {
      for (const doc of resp.docs) {
        const element = doc.data() as Filter;

        if (element.type === 'MATERIALS') {
          this.materialFilters.push(element);
        }

        if (element.type === 'COLOURS') {
          this.colourFilters.push(element);
        }

        if (element.type === 'STYLES') {
          this.styleFilters.push(element);
        }

        if (element.type === 'FURNITURES') {
          this.furnitureFilters.push(element);
        }
      }
      this.materialFilters.sort((a, b) => a.value.localeCompare(b.value));
      this.colourFilters.sort((a, b) => a.value.localeCompare(b.value));
      this.styleFilters.sort((a, b) => a.value.localeCompare(b.value));
      this.furnitureFilters.sort((a, b) => a.value.localeCompare(b.value));
    });
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
        this.formattedAmount = this.item.price;
        if (this.item.dimension == null) {
          this.item.dimension = {
            width : 0,
            depth: 0,
            height: 0
          };
        }
        this.firstFormGroup.controls.nameCtrl.setValue(this.item.name);
        this.firstFormGroup.controls.descCtrl.setValue(this.item.description);
        this.firstFormGroup.controls.price.setValue(this.formattedAmount);
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

  compareMaterialObjects(object1: string, object2: string) {

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

      for (const f of this.files) {
        this.isConverting = true;

        await this.fstorage.ref(`/temp${this.item.name}`).child(f.name).put(f).then((resp) => {

          const convert = firebase.functions.httpsCallable('pippo');

          convert({collectionName: this.item.name, filename: f.name}).then(respcallback => {
            this.item.images.push(respcallback.data);
            this.conversionDone = true;
            this.isConverting = false;
          });
        });
      }
      this.isConverting = false;
    }
  }

    save() {
    alert();
    // if (this.item.images.length === 0) {
    //   this.snackBar.open('Furniture needs to have at least 1 image');
    // } else {
    //   const collection = this.options.find(c => c.name === this.myControl.value);
    //   this.item.collectionId = collection.id;
    //   this.snackBar.open('saving, do not close the page. Please wait', '', {duration: 500});
    //
    //   this.fService.save(this.item).then(() => {
    //     this.snackBar.open('Furniture saved.');
    //   });
    }


  removeImg(i: any) {
    this.item.images = this.item.images.filter(obj => obj !== i);
  }

  addCombination() {
    const combination = new Combination();
    combination.colour = '';
    combination.images = [];
    combination.material = null;
    combination.style = null;
    this.combinations.push(combination);
  }
}
