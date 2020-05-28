import {Component, OnInit} from '@angular/core';
import {Collection} from '../model/collection';
import {Router} from '@angular/router';
import { HttpClient } from '@angular/common/http';
// @ts-ignore
import firebase from 'firebase/app';
import 'firebase/functions';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  collections: Collection[] = [];
  loading = false;
  instgramFeeds: any[] = [];

  constructor( private router: Router, private http: HttpClient) {

  }

  ngOnInit() {
    this.loading = true;
    this.collections = [];
    const convert = firebase.functions().httpsCallable('instagramFeeds');
    convert().then((resp)=>this.instgramFeeds=resp.data);
  }

  generateInstagramLink(item:any){
    window.open("https://instagram.com/p/"+item['shortcode'], '_blank');
  }

  goToCollection(idCollection: string) {
    this.router.navigate(['/collections/' + idCollection]);
  }
}
