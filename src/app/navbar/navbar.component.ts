import {Component, OnInit} from '@angular/core';
import {BasketService} from '../shared/basket.service';
import {LoginComponent} from '../login/login.component';
import {MatDialog} from '@angular/material/dialog';
import {CollectionService} from '../shared/collection.service';
import {Collection} from '../model/collection';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavBarComponent implements OnInit {

  navbarOpen = false;
  collections: Collection[] = [];
  total = 0.0;

  constructor(private basket: BasketService, public dialog: MatDialog, private collectionService: CollectionService,
              private router: Router) {
  }

  ngOnInit() {
    this.collectionService.getCollections().toPromise().then(resp => {
      for (const doc of resp.docs) {
        this.collections.push(doc.data() as Collection);
      }
    });

    const order = this.basket.order;

    const items = order.furnitures.values();
    for (const i of items) {
      if (typeof i.price === 'string') {
        this.total += Number.parseInt(i.price, 0);
      }
    }
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: 'auto',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  openBasket() {
    this.router.navigate(['/basket/']);
    this.toggleNavbar();
  }

  goToCollection(idCollection: string) {
    this.router.navigate(['/collections/' + idCollection]);
    this.toggleNavbar();
  }

  goToFurniture(){
    this.router.navigate(['/furnitures/']);
    this.toggleNavbar();
  }

  goToCollections(){
    this.router.navigate(['/collections/']);
    this.toggleNavbar();
  }

}
