import {Component, OnInit} from '@angular/core';
import {BasketService} from '../shared/basket.service';
import {Item} from '../model/Item';
import {ImageZoomContentModalComponent} from '../shared/image-zoom-content-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {FurnitureService} from '../shared/furniture.service';
import {FurnitureCacheService} from '../shared/furniture_cache.service';
import {ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';


@Component({
  selector: 'app-detail-furniture',
  templateUrl: './detail-furniture.component.html',
  styleUrls: ['./detail-furniture.component.scss'],
  // encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailFurnitureComponent implements OnInit {

  id = '';
  loading: boolean;
  item: Item;
  selectedImage ='https://lh3.googleusercontent.com/-cD5SrUCrQ40/Xc2BNG71PbI/AAAAAAAA3lo/_sWYKE-ZiIgE4h5qUNpA2giJWHb-bGgVACK8BGAsYHg/s512/2019-11-14.jpg';
  section = [];
  descButton = 'add to cart'.toLocaleUpperCase();

  images = [
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80 ',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
    'https://images.unsplash.com/photo-1541123603104-512919d6a96c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',

  ];

  imgShown = [];

  indexLastImg = 0;


  constructor(private aRoute: ActivatedRoute, private basket: BasketService, public dialog: MatDialog,
              private snackBar: MatSnackBar, private fService: FurnitureService, private fCache: FurnitureCacheService) {
    this.id = this.aRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.loading = true;
    if (this.id !== undefined && this.id.length > 0) {
      this.loading = true;
      if (!this.fCache.furnitureCache.has(this.id)) {
      this.fService.getFurniture(this.id).then(resp => {
        this.item = resp.data() as Item;
        this.fCache.addInCache(this.item);
        if (this.item.dimension === undefined) {
          this.item.dimension = null;
        }
        // if (this.item.material === undefined) {
        //   this.item.material = '';
        // }
        // this.selectedImage = this.item.images[0];
        // let collection = this.options.find(c=> c.id === this.item.collectionId);
        // this.myControl.setValue(collection.name);
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
    } else {
    this.item = this.fCache.furnitureCache.get(this.id);
    // this.selectedImage = this.item.images[0];
    this.loading = false;
    }
    this.imgShown = this.images.slice(0, 4);
    this.indexLastImg = 4;

  }

  addItem(furniture: Item) {

    const has = this.basket.order.furnitures.has(furniture.id);

    if (has) {
      this.descButton = 'add to cart'.toLocaleUpperCase();
      this.basket.order.furnitures.delete(furniture.id);
    } else {
      this.descButton = 'remove from basket'.toLocaleUpperCase();
      this.basket.order.furnitures.set(furniture.id, furniture);
    }

    // const find = this.basket.order.furnitures.find(i => i.id === furniture.id);
    // if (find !== undefined) {
    //   this.descButton = 'add to cart'.toLocaleUpperCase();
    //   this.basket.order.furnitures =  this.basket.order.furnitures.filter(i => i.id === furniture.id);
    //
    // } else {
    //   this.basket.order.furnitures.push(furniture);
    //   this.descButton = 'remove from basket'.toLocaleUpperCase();
    // }
  }

  select(image: string) {
  this.selectedImage = image;
  }

  openModalFunc(content: string) {
    this.dialog.open(ImageZoomContentModalComponent, {
      width: 'auto',
      data: {img: content}
    });
  }

  openDetailFurniture() {
    alert('not yet implemented');
  }
}

