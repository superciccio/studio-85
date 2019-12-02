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
  private numbers: number[];

  images = [
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80 ',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
  ];

  // customOptions: OwlOptions = {
  //   loop: false,
  //   mouseDrag: false,
  //   touchDrag: true,
  //   pullDrag: false,
  //   dots: true,
  //   navSpeed: 250,
  //   nav: false,
  //   navText: ['', ''],
  //   responsive: {
  //     0: {
  //       items: 1
  //     },
  //     400: {
  //       items: 1
  //     },
  //     740: {
  //       items: 1
  //     },
  //     940: {
  //       items: 1
  //     },
  //     1200: {
  //       items: 3
  //     }
  //   },
  // };

  carouselData = [
    {id: 'slide-1', text: 'Slide 1 HM', dataMerge: 2, width: 300, dotContent: 'text1', im: '../../assets/op1.webp'},
    {id: 'slide-2', text: 'Slide 2 HM', dataMerge: 1, width: 500, dotContent: 'text2', im: '../../assets/op1.2.webp'},
    {id: 'slide-3', text: 'Slide 3 HM', dataMerge: 3, width: 500, dotContent: 'text3', im: '../../assets/op1.3.webp'},
    // { text: 'Slide 6', dotContent: 'text5'},
    // { text: 'Slide 7', dotContent: 'text5'},
    // { text: 'Slide 8', dotContent: 'text5'},
    // { text: 'Slide 9', dotContent: 'text5'},
    // { text: 'Slide 10', dotContent: 'text5'},
  ];

  carouselData2 = [
    {id: 'slide-12', text: 'Slide 1 HM', dataMerge: 2, width: 300, dotContent: 'text1', im: '../../assets/op1.webp'},
    {id: 'slide-22', text: 'Slide 2 HM', dataMerge: 1, width: 500, dotContent: 'text2', im: '../../assets/op1.2.webp'},
    {id: 'slide-32', text: 'Slide 3 HM', dataMerge: 3, width: 500, dotContent: 'text3', im: '../../assets/op1.3.webp'},
    // { text: 'Slide 6', dotContent: 'text5'},
    // { text: 'Slide 7', dotContent: 'text5'},
    // { text: 'Slide 8', dotContent: 'text5'},
    // { text: 'Slide 9', dotContent: 'text5'},
    // { text: 'Slide 10', dotContent: 'text5'},
  ];

  carouselData3 = [
    {id: 'slide-123', text: 'Slide 1 HM', dataMerge: 2, width: 300, dotContent: 'text1', im: '../../assets/op1.webp'},
    {id: 'slide-223', text: 'Slide 2 HM', dataMerge: 1, width: 500, dotContent: 'text2', im: '../../assets/op1.2.webp'},
    {id: 'slide-323', text: 'Slide 3 HM', dataMerge: 3, width: 500, dotContent: 'text3', im: '../../assets/op1.3.webp'},
    // { text: 'Slide 6', dotContent: 'text5'},
    // { text: 'Slide 7', dotContent: 'text5'},
    // { text: 'Slide 8', dotContent: 'text5'},
    // { text: 'Slide 9', dotContent: 'text5'},
    // { text: 'Slide 10', dotContent: 'text5'},
  ];


   categoriesFurniture: string[];
   furnitures: Item[] = [];
   orginalList: Item[] = [];
   filteredFurnitures: Item[] = [];

  over:boolean[];
  loading = false;


  constructor(private router: Router, private service: SharedVariableService, private fService: FurnitureService) {
    this.categoriesFurniture = service.getCategoriesFurniture();
    this.numbers = Array(5).fill(0).map((x, i) => i);
  }

  ngOnInit() {
    this.fService.getFurnitures().toPromise().then(resp => {
      resp.docs.map(qs => {
        this.furnitures.push(qs.data() as Item);
        this.orginalList.push(qs.data() as Item);
        this.over = new Array(2);
        this.over.fill(false);
      } );
    });
  }

  filterList(categoryId: string) {
    this.filteredFurnitures = this.furnitures.filter(f => f.categoryItem === categoryId);
    if (this.filteredFurnitures.length === 0) {
      this.furnitures = this.orginalList;
      this.filteredFurnitures = this.furnitures.filter(f => f.categoryItem === categoryId);
    }
    this.furnitures = this.filteredFurnitures;
  }

  goToDetail(id: string) {
    this.router.navigate(['/detailfurniture/' + id]);
  }
}
