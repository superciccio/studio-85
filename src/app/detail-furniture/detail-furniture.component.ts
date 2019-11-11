import {Component, OnInit} from '@angular/core';
import {BasketService} from '../shared/basket.service';
import {Item} from '../model/Item';
import {ImageZoomContentModalComponent} from '../shared/image-zoom-content-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {FurnitureService} from '../shared/furniture.service';


@Component({
  selector: 'app-detail-furniture',
  templateUrl: './detail-furniture.component.html',
  styleUrls: ['./detail-furniture.component.scss']
})
export class DetailFurnitureComponent implements OnInit {

  id = '';
  loading: boolean;
  item: Item;

  constructor(private aRoute: ActivatedRoute, private basket: BasketService, public dialog: MatDialog,
              private snackBar: MatSnackBar, private fService: FurnitureService) {
    this.id = this.aRoute.snapshot.params.id;
  }

  ngOnInit() {
    this.loading = true;
    if(this.id !== undefined && this.id.length>0){
      this.loading = true;
      this.fService.getFurniture(this.id).then(resp=>{
        this.item = resp.data() as Item;
        // let collection = this.options.find(c=> c.id === this.item.collectionId);
        // this.myControl.setValue(collection.name);
        this.loading = false;
      });
    }
    else {
      this.loading = false;
    }
  }

  addItem(furniture: Item) {
    this.basket.Items.push(furniture);
    this.snackBar.open('Item added to the basket', null, {
      duration: 2000,
    });
  }

  openModalFunc(content: string) {
    this.dialog.open(ImageZoomContentModalComponent, {
      width: 'auto',
      data: {img: content}
    });
  }

}

