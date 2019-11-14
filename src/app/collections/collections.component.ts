import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CollectionService} from '../shared/collection.service';
import {Collection} from '../model/collection';
import {FurnitureService} from '../shared/furniture.service';
import {Item} from '../model/Item';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent implements OnInit {

  id = '';
  collection: Collection;
  collections: Collection[] = [];
  oddCollections: Collection[] = [];
  evenCollections: Collection[] = [];
  single = false;
  furnitures: Item[] = [];
  displayedColumns: string[] = ['img', 'name', 'description', 'action'];
  dataSource = new MatTableDataSource();
  loading = false;


  constructor(private aRoute: ActivatedRoute, private router: Router, private collectionService: CollectionService,
              private furnitureService: FurnitureService) {
  }

  ngOnInit() {
    this.aRoute.params.subscribe(params => {
      this.id = this.aRoute.snapshot.params.id;
      this.collection = null;
      if (this.id !== undefined && this.id.length > 0) {
        this.collectionService.getCollectionById(this.id).toPromise().then(resp => {
          this.collection = resp.data() as Collection;
        }).then(r => {
            this.furnitureService.getFurnituresByCollectionId(this.collection.id).then(fResp => {
              fResp.docs.map(ds => this.furnitures.push(ds.data() as Item));

            });
          }
        );
        this.single = true;
        this.id = null;
        this.collections = [];
      }
    });
    if (this.id == null) {
      this.collectionService.getCollections().toPromise().then(resp => {

        for (const doc of resp.docs) {
          this.collections.push(doc.data() as Collection);
        }
        this.collections.forEach(((value, index) => {
          if (index % 2 === 0) {
            console.log('even ' , index % 2 === 0);
            console.log(value.name);
            this.evenCollections.push(value);
          } else {
            this.oddCollections.push(value);
          }
        }));
        this.dataSource = new MatTableDataSource(this.collections);
        this.loading = false;
      });
    }
  }

  loadCollection(idCollection: string) {
    this.router.navigate(['/collections/' + idCollection]);
  }

  goToDetail(id: string) {
    this.router.navigate(['/detailfurniture/' + id]);
  }

}
