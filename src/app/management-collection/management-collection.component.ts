import {Component, OnInit} from '@angular/core';
import {Collection} from '../model/collection';
import {Router} from '@angular/router';
import {CollectionService} from '../shared/collection.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-management-collection',
  templateUrl: './management-collection.component.html',
  styleUrls: ['./management-collection.component.scss']
})
export class ManagementCollectionComponent implements OnInit {

  displayedColumns: string[] = ['img', 'name', 'description', 'action'];
  collections: Collection[] = [];
  loading = false;
  dataSource = new MatTableDataSource();


  constructor(private router: Router, private collectionService: CollectionService) {
  }

  ngOnInit() {
    this.loading = true;
    this.collections = [];
    this.collectionService.getCollections().toPromise().then(resp => {
      for (const doc of resp.docs) {
        this.collections.push(doc.data() as Collection);
      }
      this.dataSource = new MatTableDataSource(this.collections);
      this.loading = false;
    });
  }

  editCollection(idCollection: string) {
    this.router.navigate(['/neweditcollection/' + idCollection]);
  }

  newCollection() {
    this.router.navigate(['/neweditcollection']);
  }

}
