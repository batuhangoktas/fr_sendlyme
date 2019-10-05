import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MenuComponent} from './menu/menu.component';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {PrivacyComponent} from './privacy/privacy.component';
import {LegalinfoComponent} from './legalinfo/legalinfo.component';
import {IntroComponent} from './intro/intro.component';

const routes: Routes = [
  {
    path: '', component: IntroComponent
  },
  {
  path: 'menu', component: MenuComponent
  },
  {
    path: 'privacy', component: PrivacyComponent
  },
  {
    path: 'legalinfo', component: LegalinfoComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
