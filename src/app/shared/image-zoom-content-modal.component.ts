import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'image-zoom',
  template: `
        <img [src]="data.img" width="480" height="480">
  `
})
export class ImageZoomContentModalComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
  }


}
