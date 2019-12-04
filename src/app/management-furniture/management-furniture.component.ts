import {Component, OnInit} from '@angular/core';
import {Item} from '../model/Item';
import { Router } from '@angular/router';
import {FurnitureService} from '../shared/furniture.service';
import {Collection} from '../model/collection';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-management-furniture',
  templateUrl: './management-furniture.component.html',
  styleUrls: ['./management-furniture.component.scss']
})
export class ManagementFurnitureComponent implements OnInit {

  furnitures: Item[] = [];
  loading: boolean;

  constructor(private router: Router, private fService: FurnitureService) {
  }

  displayedColumns: string[] = ['name', 'description', 'price', 'action'];
  dataSource = new MatTableDataSource();

  ngOnInit() {
    this.loading = true;
    this.furnitures = [];
    this.fService.getFurnitures().toPromise().then(resp => {
      for (const doc of resp.docs) {
        this.furnitures.push(doc.data() as Item);
      }
      this.dataSource = new MatTableDataSource(this.furnitures);
      this.loading = false;
    });
  }

  editFurniture(idFurniture: string) {
    this.router.navigate(['/neweditfurniture/' + idFurniture]);
  }

  newFurniture() {
    this.router.navigate(['/neweditfurniture']);
  }
  
  deleteFurniture(idFurniture: string){
  alert('no yet implemented');
  }

}


