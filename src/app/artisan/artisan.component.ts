import {Component, OnInit} from '@angular/core';
import {ArtisanService} from '../shared/artisan.service';
import {Artisan} from '../model/artisan';

@Component({
  selector: 'app-artisan',
  templateUrl: './artisan.component.html',
  styleUrls: ['./artisan.component.scss']
})
export class ArtisanComponent implements OnInit {

  loading = false;
  artisans: Artisan[] = [];
  showList = false;
  showSingle = false;
  constructor(private aService: ArtisanService) {
  }

  ngOnInit() {
    this.loading = true;
    this.aService.getAllArtisan().toPromise().then(resp => {
      for (const doc of resp.docs) {
        this.artisans.push(doc.data() as Artisan);
      }
      this.loading = false;
      this.showList = true;
    });
  }

}
