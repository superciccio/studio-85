import {Component, EventEmitter, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { FormControl } from '@angular/forms';
import { Collection } from 'src/app/model/collection';
import { CollectionService } from 'src/app/shared/collection.service';
import {AngularFireStorage} from '@angular/fire/storage';
import {HttpClient} from '@angular/common/http';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import {MatSnackBar} from '@angular/material/snack-bar';
// @ts-ignore
import firebase from 'firebase/app';
import 'firebase/functions';

@Component({
  selector: 'app-neweditcollection',
  templateUrl: './newEditCollection.component.html',
  styleUrls: ['./newEditCollection.component.scss']
})
export class NewEditCollectionComponent implements OnInit {

  myControl = new FormControl();

  collections: Array<Collection> = [];

  item: Collection;

  descToggle: string;
conversionDone  = false;
  isConverting = false;
  id: string;
  loading = false;

  constructor(private route: ActivatedRoute, private router: Router, private cService: CollectionService, private http: HttpClient,
              private fstorage: AngularFireStorage, private snackBar: MatSnackBar) {
    this.id = this.route.snapshot.params.id;
    this.item = {
      id: '',
      description: '',
      name: '',
      cover: '',
      isInHomePage: false
    };
  }

  ngOnInit() {
    // this.loading = true;
  this.descToggle = this.item.isInHomePage ? 'Show in home page' : 'Do not show in home page';
  if (this.id !== undefined && this.id.length > 0) {
    this.loading = true;
    this.cService.getCollectionById(this.id).toPromise().then(resp => {
      this.item = resp.data() as Collection;
      this.loading = false;
    });
    }
    }

 back() {
   this.router.navigate(['/management']);
 }

  public async fileChange(files: FileList) {
    const file = files.item(0);
    if (this.item.name === '') {
      alert('Please specify a name first');

    } else {

      this.isConverting = true;

      this.fstorage.ref(`/temp${this.item.name}`).child(file.name).put(file).then((resp) => {

const convert = firebase.functions().httpsCallable('pippo');

convert({collectionName: this.item.name, filename: file.name }).then((respcallback) => {
          this.item.cover = respcallback.data;
          this.isConverting = false;
          this.conversionDone = true;
        });

      });


    }
  }

  checkToggleInHomePage(event: MatSlideToggleChange) {
    // this.descToggle = this.item.isInHomePage ? 'Show in home page' : 'Do not show in home page';
  }

    save() {
this.snackBar.open('saving, do not close the page. Please wait', '', {duration: 250});
this.cService.save(this.item).then(() => {
      this.snackBar.open('Collection saved.');
    });
 }
}
