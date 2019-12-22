import {Component, OnInit} from '@angular/core';
import {SharedVariableService} from '../shared/shared-variable.service';
import {FurnitureService} from '../shared/furniture.service';
import {Filter} from '../model/filter';
import {Router} from '@angular/router';
import { Item } from '../model/Item';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.scss']
})
export class FurnitureComponent implements OnInit {

  loading = false;
  listFurnitures: Item[] = [];
  originalListFurnitures: Item[] = [];
  materialFilters: Filter[] = [];
  colourFilters: Filter[] = [];
  styleFilters: Filter[] = [];
  furnitureFilters: Filter[] = [];

  furnitureFilterCtrl = new FormControl();
  colourFilterCtrl = new FormControl();
  styleFilterCtrl = new FormControl();
  materialFilterCtrl = new FormControl();

  filterToApply: Filter[] = [];

  show = 5;

  constructor(private router: Router, private service: SharedVariableService, private fService: FurnitureService) {

  }

  ngOnInit() {
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
          this.loading = false;

        }

        this.materialFilters.sort((a, b) => a.value.localeCompare(b.value));
        this.furnitureFilters.sort((a, b) => a.value.localeCompare(b.value));
        this.colourFilters.sort((a, b) => a.value.localeCompare(b.value));
        this.styleFilters.sort((a, b) => a.value.localeCompare(b.value));

    });

    this.fService.getFurnitures().toPromise().then(resp => {
       resp.docs.map(qs => {
         const item =  qs.data() as Item;
         item.price = item.price.toString().substring(1);
         this.listFurnitures.push(item);
         this.originalListFurnitures.push(item);
       });
   }).then(() => {
     this.listFurnitures.sort((a, b) => a.name.localeCompare(b.name));
     this.originalListFurnitures.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['/detailfurniture/' + id]);
  }

  applyFurnitureFilter(values: Filter[]) {
    if (values.length === 0) {
      this.listFurnitures = this.originalListFurnitures;
    } else {
      this.filterToApply.push(...values.values());
    }
    this.applyAllFilters();

  }

  applyAllFilters() {
    this.listFurnitures = [];
    for (const x of this.originalListFurnitures) {
      for (const lol of this.filterToApply) {
        if (x.categoryItem. value === lol.value) {
          this.listFurnitures.push(x);
        }
      }
    }
  }

  applyMaterialFilter(values: Filter[]) {

    if (values.length === 0) {
      this.listFurnitures = this.originalListFurnitures;
    } else {
      this.filterToApply.push(...values.values());
    }
    this.applyAllFilters();

  }

  applyColourFilter(values: Filter[]) {

    if (values.length === 0) {
      this.listFurnitures = this.originalListFurnitures;
    } else {
      this.filterToApply.push(...values.values());
    }
    this.applyAllFilters();

  }

  openDesignerDetail(id: string) {
    alert('no yet implemented');
  }

  orderByPriceHighToLow() {
    this.listFurnitures.sort((a, b) => (b.price as number) - (a.price as number));
  }

  orderByPriceLowToHigh() {
    this.listFurnitures.sort((a, b) => (a.price as number) - (b.price as number));
  }
}
