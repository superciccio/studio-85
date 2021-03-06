import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {BasketService} from '../shared/basket.service';
import {Item} from '../model/Item';
import {ImageZoomContentModalComponent} from '../shared/image-zoom-content-modal.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {FurnitureService} from '../shared/furniture.service';
import {FurnitureCacheService} from '../shared/furniture_cache.service';
import {Title} from '@angular/platform-browser';
import {MediaMatcher} from '@angular/cdk/layout';
import {CarouselConfig} from "ngx-bootstrap/carousel";


@Component({
  selector: 'app-detail-furniture',
  templateUrl: './detail-furniture.component.html',
  styleUrls: ['./detail-furniture.component.scss'],
  providers: [
    { provide: CarouselConfig, useValue: {  showIndicators: true, } }
  ]
})
export class DetailFurnitureComponent implements OnInit, OnDestroy {

  id = '';
  loading = true;
  item: Item;
  selectedImage = '';
  section = [];
  descButton = 'add to cart'.toLocaleUpperCase();
  images = [
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
    'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80 ',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
    'https://images.unsplash.com/photo-1541123603104-512919d6a96c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1502&q=80',

  ];

  imgShown = [];

  indexLastImg = 0;
  titleBottomList = '';
  bottomList: Item[] = [];
  bottomListUnfiltered: Item[] = [];
  smallImages: string[] = [];
  largeImages: string[] = [];
  indexStart = 0;
  indexEnd = 4;
  listAvailableColor = [];
  fromSameCategory: Item[] = [];
  fromSameCollection: Item[] = [];

  mobileQuery: MediaQueryList;
  private mobileQueryListener: () => void;

  constructor(private aRoute: ActivatedRoute, private router: Router, private basket: BasketService, public dialog: MatDialog,
              private snackBar: MatSnackBar, private fService: FurnitureService, private fCache: FurnitureCacheService,
              private titleService: Title, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this.mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this.mobileQueryListener);
  }

  ngOnInit() {
    this.loading = true;
    this.smallImages = [];
    this.aRoute.params.subscribe(params => {
      this.id = this.aRoute.snapshot.params.id;
    });
    if (this.id !== undefined && this.id.length > 0) {
      this.loading = true;
        this.fService.getFurniture(this.id).then(resp => {
          this.item = resp.data() as Item;
          this.item.combinations.map(comb => {
            this.listAvailableColor.push(comb.colour);
          });

          this.fCache.addInCache(this.item);
          if (this.item.dimension === undefined) {
            this.item.dimension = null;
          }
          for (const combination of this.item.combinations) {
            for (const image of combination.images) {
              if (image.includes('s.jpg')) {
                this.smallImages.push(image);
              } else {
                this.largeImages.push(image);
              }
            }
          }
          this.setTitleBottomList();
          this.loading = false;
        });
    }
    this.selectedImage = this.largeImages[0];
    this.imgShown = this.images.slice(0, 4);
    this.indexLastImg = 4;

  }

  setTitleBottomList() {
    this.titleBottomList = this.item.collectionId === '' ? 'Similar to this' : 'More from this collection';
    this.titleService.setTitle(`Studio 85 - ${this.item.name}`);

    const has = this.basket.order.furnitures.has(this.item.id);
    if (has) {
      this.descButton = 'remove from basket'.toLocaleUpperCase();
    }
  }

  addItem(furniture: Item) {
    const has = this.basket.order.furnitures.has(furniture.id);
    if (has) {
      this.descButton = 'add to cart'.toLocaleUpperCase();
      this.basket.order.furnitures.delete(furniture.id);
    } else {
      this.descButton = 'remove from basket'.toLocaleUpperCase();
      this.basket.order.furnitures.set(furniture.id, furniture);
    }
  }

  select(image: string) {
    this.selectedImage = image;
  }

  openModalFunc(content: string) {
    this.dialog.open(ImageZoomContentModalComponent, {
      width: 'auto',
      data: {img: content}
    });
  }

  sliceList(start: number, end: number) {
    if (start < 0) {
      this.indexStart = start;
    }
    if (end > this.bottomListUnfiltered.length) {
      this.indexStart = this.bottomListUnfiltered.length;
    }
    this.bottomList = [];
    this.bottomList = this.bottomListUnfiltered.slice(this.indexStart, this.indexEnd);
  }

  backArrow() {
    this.indexStart -= 4;
    this.indexEnd -= 4;
    this.sliceList(this.indexStart, this.indexEnd);
  }

  forwardArrow() {
    this.indexStart += 4;
    this.indexEnd += 4;
    this.sliceList(this.indexStart, this.indexEnd);
  }

  openDetailFurniture(id: string) {
    this.router.navigate(['/detailfurniture/' + id]);
  }

  setImage(i: string) {
    const foBeFounfd = i.replace('s.jpg', '.jpg');
    for (const image of this.item.images) {
       if (image.includes(foBeFounfd)) {
         this.selectedImage = image;
      }
    }
  }


    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this.mobileQueryListener);
  }
}

