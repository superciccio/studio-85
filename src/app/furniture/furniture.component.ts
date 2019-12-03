import {Component, OnInit} from '@angular/core';
import {SharedVariableService} from '../shared/shared-variable.service';
import {FurnitureService} from '../shared/furniture.service';
import {Item} from '../model/Item';
import {Router} from '@angular/router';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture.component.html',
  styleUrls: ['./furniture.component.scss']
})
export class FurnitureComponent implements OnInit {
  
  loading: boolean = false;  
  materialFilters: Filter[] = [];
  colourFilters: Filter[] = [];
  styleFilters: Filter[] = [];
  furnitureFilters: Filter[] = [];


  constructor(private router: Router, private service: SharedVariableService, private fService: FurnitureService) {
    
  }

  ngOnInit() {
    this.loading = true;
    this.fService.getFilters().toPromise().then(resp => {
      resp.docs.map(qs => {
        
        for(const doc in qs.documents){
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
        
      } );
    });
  }

  goToDetail(id: string) {
    this.router.navigate(['/detailfurniture/' + id]);
  }
}
