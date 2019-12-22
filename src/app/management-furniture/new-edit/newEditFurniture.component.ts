import {Component, OnInit} from '@angular/core';
import {map, startWith} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/model/collection';
import { CollectionService } from 'src/app/shared/collection.service';
import {Combination, Item, Material, Style} from 'src/app/model/Item';
import {FurnitureService} from '../../shared/furniture.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {SharedVariableService} from '../../shared/shared-variable.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CurrencyPipe} from '@angular/common';
// @ts-ignore
import {functions} from 'firebase/app';
import 'firebase/functions';
import {Filter} from '../../model/filter';
import {Dimension} from '../../model/dimension';

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
    this.firstFormGroup = this.formBuilder.group({
      nameCtrl: ['', Validators.required],
      descCtrl: ['', Validators.required],
      collCtrl: [''],
      priceCtrl: ['', Validators.required],
      catCtrl: ['', Validators.required],
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
      smallImages: [],
      categoryItem: new Filter(),
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
      resp.docs.map(doc => this.options.push(doc.data() as Collection));
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
        (resp.data().combinations).map((obj: Combination) => {
          console.log('loading: ', obj);
          this.combinations.push(obj);
         return Object.assign([], obj);
        });
        this.item.combinations = this.combinations;
        if (this.item.dimension == null) {
          this.item.dimension = {
            width : 0,
            depth: 0,
            height: 0
          };
        }
        this.firstFormGroup.controls.nameCtrl.setValue(this.item.name);
        this.firstFormGroup.controls.descCtrl.setValue(this.item.description);
        this.firstFormGroup.controls.priceCtrl.setValue(this.formattedAmount);
        this.firstFormGroup.controls.collCtrl.setValue(this.item.collectionId);
        this.firstFormGroup.controls.catCtrl.setValue(this.item.categoryItem);
        // const collection = this.options.find(c => c.id === this.item.collectionId);
        // this.myControl.setValue(collection.name);
        this.loading = false;
      });
    }
  }

  transformAmount(element) {
    this.formattedAmount = this.currencyPipe.transform(Number.parseInt(this.firstFormGroup.controls.priceCtrl.value, 0), '£');

    element.target.value = this.formattedAmount;
    this.firstFormGroup.controls.priceCtrl.setValue(this.formattedAmount);
  }

  compareCategoryObjects(object1: string, object2: string) {

    return object1 === object2;
  }

  compareMaterialObjects(object1: Material, object2: Material) {

    return object1 === object2;
  }

  private _filter(value: string): Collection[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);

  }

 back() {
   this.router.navigate(['/management']);
 }

  public async fileChange(files: FileList, indexList: number) {
    if (this.firstFormGroup.controls.nameCtrl.value === '') {
      alert('Please specify a name first');

    } else {

      for (let i = 0; i < files.length; i++) {
        const f = files.item(i);
        this.isConverting  = true;
        await this.fstorage.ref(`/${this.firstFormGroup.controls.nameCtrl.value}/${f.name}`).put(f).then((resp) => {
          resp.ref.getDownloadURL().then(dwn => {
            if(dwn.toString().includes('s.')) {
              this.item.smallImages.push(dwn);
            } else{
              this.item.images.push(dwn);
            }
            this.combinations[indexList].images.push(dwn);
          });
          this.isConverting = false;
        });

      }

      this.isConverting = false;
    }
  }

    save() {
    this.item.name = this.firstFormGroup.controls.nameCtrl.value;
    this.item.collectionId = this.firstFormGroup.controls.collCtrl.value;
    this.item.description = this.firstFormGroup.controls.descCtrl.value;
    this.item.price = this.firstFormGroup.controls.priceCtrl.value;
    this.item.categoryItem = this.firstFormGroup.controls.catCtrl.value;
    this.item.combinations = this.combinations;
    this.item.combinations = this.combinations.map((obj) => {
      obj.dimension =   Object.assign({}, obj.dimension);
      return Object.assign({}, obj);
      });

    this.snackBar.open('saving, do not close the page. Please wait', '', {duration: 250});

    this.fService.save(this.item).then(() => {
        this.snackBar.open('Furniture saved.');
      });
    }


  removeImg(i: any) {
    this.item.images = this.item.images.filter(obj => obj !== i);
  }

  addCombination() {
    const combination = new Combination();
    combination.colour = '';
    combination.images = [];
    combination.material = new Material();
    combination.style = new Style();
    combination.dimension = new Dimension();
    this.combinations.push(combination);
  }

  removeCombination(i: number) {
   this.combinations =  this.combinations.splice(i, 1);
  }
}
