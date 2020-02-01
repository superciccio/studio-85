import {AfterViewInit, Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
// @ts-ignore
import { } from 'googlemaps';
import {BasketService} from '../shared/basket.service';


@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, AfterViewInit {

  public searchControl: FormControl;


  @ViewChild('search')
  public searchElementRef: ElementRef;
   emailCtrl: FormControl;
   nameCtrl: FormControl;
  ccNumber: number;
  phoneCtrl: FormControl;
  noteCtrl: FormControl;
  total = 0;

  constructor(    private mapsAPILoader: MapsAPILoader,  private ngZone: NgZone, private basket: BasketService
  ) { }

  ngAfterViewInit(): void {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          console.log(place.formatted_address);

        });
      });
    });

  }



  ngOnInit() {
    this.searchControl = new FormControl('', [Validators.required]);
    this.emailCtrl = new FormControl('', [
      Validators.required,
      Validators.email
    ]);
    this.nameCtrl = new FormControl('', [
      Validators.required,
    ]);
    this.phoneCtrl = new FormControl('', [
      Validators.required
    ]);
    this.noteCtrl = new FormControl('', [
      Validators.required
    ]);

    if(this.basket.order !== undefined ){
      const items = this.basket.order.furnitures.values();
      for (const i of items) {
        this.total +=  i.price;
      }
    }
  }

}
