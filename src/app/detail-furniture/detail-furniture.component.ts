import {Component, OnInit} from '@angular/core';
import {BasketService} from '../shared/basket.service';
import {Item} from '../model/Item';
import {ImageZoomContentModalComponent} from '../shared/image-zoom-content-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {FurnitureService} from '../shared/furniture.service';
import {FurnitureCacheService} from '../shared/furniture_cache.service';


@Component({
  selector: 'app-detail-furniture',
  templateUrl: './detail-furniture.component.html',
  styleUrls: ['./detail-furniture.component.scss']
})
export class DetailFurnitureComponent implements OnInit {

  id = '';
  loading: boolean;
  item: Item;
  selectedImage: string;

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
        console.log('adding in cache');
        this.selectedImage = this.item.images[0];
        // let collection = this.options.find(c=> c.id === this.item.collectionId);
        // this.myControl.setValue(collection.name);
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
    } else {
    this.item = this.fCache.furnitureCache.get(this.id);
    this.selectedImage = this.item.images[0];
    this.loading = false;
    }
  }

  addItem(furniture: Item) {
    this.basket.Items.push(furniture);
    this.snackBar.open('Item added to the basket', null, {
      duration: 2000,
    });
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

}

