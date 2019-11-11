import {Component, OnInit} from '@angular/core';
import {CollectionService} from '../shared/collection.service';
import {Collection} from '../model/collection';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  collections: Collection[] = [];
  loading = false;

  constructor(private collectionService: CollectionService, private router: Router) {

  }

  ngOnInit() {
    this.loading = true;
    this.collections = [];
    this.collectionService.getHomeCollections().then(resp => {
      for (const doc of resp.docs) {
        this.collections.push(doc.data() as Collection);
      }
      this.loading = false;
    });
  }

  goToCollection(idCollection: string) {
    this.router.navigate(['/collections/' + idCollection]);
  }
}
