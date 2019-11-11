import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArtisanComponent} from './artisan/artisan.component';
import {FurnitureComponent} from './furniture/furniture.component';
import {CollectionsComponent} from './collections/collections.component';
import {OurvisionComponent} from './ourvision/ourvision.component';
import {HomeComponent} from './home/home.component';
import {DetailFurnitureComponent} from './detail-furniture/detail-furniture.component';
import {ManagementComponent} from './management/management.component';
import { NewEditFurnitureComponent } from './management-furniture/new-edit/newEditFurniture.component';
import {AngularFireAuthGuard, canActivate, customClaims, hasCustomClaim, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {map} from 'rxjs/operators';
import {pipe} from 'rxjs';
import {NewEditCollectionComponent} from './management-collection/new-edit/newEditCollection.component';

const adminOnly = () => pipe(customClaims, map(claims => {
  // return claims.admin === true ? claims.admin : ['/'];
  return claims.admin === true ;
}));

const userOnly = hasCustomClaim('user');
const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);
const redirectUnauthorizedToLogin = redirectUnauthorizedTo(['login']);
// const accessMyProfile = (next) => pipe(redirectUnauthorizedToLogin, map(user => !!user && next.params.userId === user.uid))
//const onlyAllowSelf = (next) => map(user => !!user && next.params.userId === user.uid);


const routes: Routes = [
  {path: 'home', component: HomeComponent},

  {path: 'collections', component: CollectionsComponent},
  {path: 'collections/:id', component: CollectionsComponent},
  {path: 'ourvision', component: OurvisionComponent},
  {path: 'furniture', component: FurnitureComponent},
  {path: 'neweditfurniture', component: NewEditFurnitureComponent},
  {path: 'neweditfurniture/:id', component: NewEditFurnitureComponent},
  {path: 'neweditcollection', component: NewEditCollectionComponent},
  {path: 'neweditcollection/:id', component: NewEditCollectionComponent},

  {path: 'detailfurniture/:id', component: DetailFurnitureComponent},
  {path: 'detail', component: DetailFurnitureComponent},
  {path: 'artisan', component: ArtisanComponent},
  //{path: 'me', component: ManagementComponent, canActivate: [AngularFireAuthGuard], data : {authGuardPipe : onlyAllowSelf}},
  {path: 'management', component: ManagementComponent, canActivate: [AngularFireAuthGuard], data : {authGuardPipe : adminOnly}},
  {path: '', redirectTo: 'home', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
