import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';

const routes: Routes = [
  {
    path: '', component: HeaderComponent
  },
  {
  path: 'menu', component: MenuComponent
  }

];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
