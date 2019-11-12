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

  constructor(private basket: BasketService, public dialog: MatDialog, private collectionService: CollectionService,
              private router: Router) {
  }

  ngOnInit() {
    this.collectionService.getCollections().toPromise().then(resp => {
      for (const doc of resp.docs) {
        this.collections.push(doc.data() as Collection);
      }
    });
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
    if (this.basket.Items.length === 0) {
      alert('No items in the basket');
    }
  }

  goToCollection(idCollection: string) {
    this.router.navigate(['/collections/' + idCollection]);
  }

}
