import {Component, Input, OnInit} from '@angular/core';
import {Item} from '../model/Item';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {

  @Input()
  furniture: Item;

  constructor() { }

  ngOnInit() {
  }

}
