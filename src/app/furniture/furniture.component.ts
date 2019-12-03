import {Component, OnInit} from '@angular/core';
import {SharedVariableService} from '../shared/shared-variable.service';
import {FurnitureService} from '../shared/furniture.service';
import {Filter} from '../model/filter';
import {Router} from '@angular/router';
import { Item } from '../model/Item';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.scss']
})
export class FurnitureComponent implements OnInit {
  
  loading: boolean = false;
  listFurnitures: Item[] = [];  
  materialFilters: Filter[] = [];
  colourFilters: Filter[] = [];
  styleFilters: Filter[] = [];
  furnitureFilters: Filter[] = [];

  furnitureFilterCtrl = new FormControl();
  colourFilterCtrl = new FormControl();
  styleFilterCtrl = new FormControl();
  materialFilterCtrl = new FormControl();

  constructor(private router: Router, private service: SharedVariableService, private fService: FurnitureService) {
    
  }

  ngOnInit() {
    this.loading = true;
    this.service.getFilters().toPromise().then(resp => {
        
        for(const doc of resp.docs){
          const element = doc.data() as Filter;
        
          if(element.type == "MATERIALS"){
          this.materialFilters.push(element);
          }
          
          if(element.type == "COLOURS"){
          this.colourFilters.push(element);
          }
          
          if(element.type == "STYLES"){
          this.styleFilters.push(element);
          }
        
          if(element.type == "FURNITURES"){
          this.furnitureFilters.push(element);
          }
          this.loading = false;
        
        }
        
    });
   
   this.fService.getFurnitures().toPromise().then(resp => {
       resp.docs.map(qs => this.listFurnitures.push(qs.data() as Item));
   });
  }

  goToDetail(id: string) {
    this.router.navigate(['/detailfurniture/' + id]);
  }
}
