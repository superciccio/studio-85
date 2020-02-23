import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {SharedVariableService} from '../shared/shared-variable.service';
import {FurnitureService} from '../shared/furniture.service';
import {Filter} from '../model/filter';
import {Router} from '@angular/router';
import { Item } from '../model/Item';
import { FormControl } from '@angular/forms';
import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.scss']
})
export class FurnitureComponent implements OnInit, OnDestroy {

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
  filterToRemove: Filter[] = [];

  show = 5;

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;
  breakpoint: number;

  constructor(private router: Router, private service: SharedVariableService, private fService: FurnitureService,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.breakpoint = (window.innerWidth <= 600) ? 1 : 4;

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

  applyFilter(values: Filter) {
    const filter = this.filterToApply.find(i => i.id === values.id);
    if (filter === undefined) {
      this.filterToApply.push(values);
    } else {
      const index = this.filterToApply.indexOf(filter);
      this.filterToApply = this.filterToApply.splice(index, 0);
    }
    this.applyAllFilters();

  }

  applyAllFilters() {
    this.listFurnitures = [];
    for (const x of this.originalListFurnitures) {
      for (const lol of this.filterToApply) {
        if (x.categoryItem. value === lol.value) {
          const item = this.listFurnitures.find(i => i.id === x.id);
          if (item === undefined) {
            this.listFurnitures.push(x);
          }
        }
      }
    }
    if (this.listFurnitures.length === 0) {
      this.resetFilters();
    }
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

  orderByAToZ() {
    this.listFurnitures.sort((a, b) => b.name.localeCompare(a.name) );
  }

  orderByZToA() {
    this.listFurnitures.sort((a, b) => a.name.localeCompare(b.name) );
  }

  resetFilters() {
    this.listFurnitures = [];
    this.listFurnitures = [...this.originalListFurnitures];
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this.mobileQueryListener);
  }

  onResize(event) {
    if (event.target.innerWidth === 768) {
      this.breakpoint = 3;
    } else if (event.target.innerWidth <= 768 && event.target.innerWidth >= 608) {
      this.breakpoint = 2;
    } else if (event.target.innerWidth <= 608) {
      this.breakpoint = 1;
    } else {
      this.breakpoint = 4;
    }
  }
}
