import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavBarComponent} from './navbar/navbar.component';
import {CollectionsComponent} from './collections/collections.component';
import {FurnitureComponent} from './furniture/furniture.component';
import {ArtisanComponent} from './artisan/artisan.component';
import {OurvisionComponent} from './ourvision/ourvision.component';
import {HomeComponent} from './home/home.component';
import {CarouselComponent, CarouselItemElement} from './shared/carousel.component';
import {CarouselItemDirective} from './shared/carousel-item.directive';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {DetailFurnitureComponent} from './detail-furniture/detail-furniture.component';
import {BasketService} from './shared/basket.service';
import {CollectionService} from './shared/collection.service';
import {BasketComponent} from './basket/basket.component';
import {ImageZoomContentModalComponent} from './shared/image-zoom-content-modal.component';
import {FooterComponent} from './footer/footer.component';
import {LoginComponent} from './login/login.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {ManagementComponent} from './management/management.component';
import {MatTabsModule} from '@angular/material/tabs';
import {ManagementFurnitureComponent} from './management-furniture/management-furniture.component';
import {ManagementCollectionComponent} from './management-collection/management-collection.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { NewEditFurnitureComponent } from './management-furniture/new-edit/newEditFurniture.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFireAuthGuard} from '@angular/fire/auth-guard';
import {FurnitureService} from './shared/furniture.service';
import {NewEditCollectionComponent} from './management-collection/new-edit/newEditCollection.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggle, MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSelectModule} from '@angular/material/select';
import {MatCarouselModule} from '@ngmodule/material-carousel';
import {CurrencyPipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    CarouselComponent,
    CarouselItemDirective,
    CarouselItemElement,
    CollectionsComponent,
    FurnitureComponent,
    ArtisanComponent,
    OurvisionComponent,
    HomeComponent,
    DetailFurnitureComponent,
    BasketComponent,
    ImageZoomContentModalComponent,
    FooterComponent,
    LoginComponent,
    UserProfileComponent,
    ManagementComponent,
    ManagementFurnitureComponent,
    ManagementCollectionComponent,
    NewEditFurnitureComponent,
    NewEditCollectionComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    CarouselModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatGridListModule,
    MatSnackBarModule,
    MatTabsModule,
    MatIconModule,
    FormsModule,
    MatTableModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCarouselModule
  ],
  providers: [AngularFireAuthGuard, CurrencyPipe, BasketService, CollectionService, FurnitureService],
  bootstrap: [AppComponent, NavBarComponent],
  entryComponents: [ImageZoomContentModalComponent, LoginComponent],
})
export class AppModule {
}
