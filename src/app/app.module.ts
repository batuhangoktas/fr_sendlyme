import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatInputModule, MatProgressSpinnerModule} from '@angular/material';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { MenuComponent } from './menu/menu.component';
import {MatTableModule} from '@angular/material/table';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DialogpopupComponent } from './dialogpopup/dialogpopup.component';
import { MatMenuModule} from '@angular/material/menu';
import {MatDialogModule} from '@angular/material';
import { NgxSpinnerModule } from 'ngx-spinner';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { PrivacyComponent } from './privacy/privacy.component';
import { LegalinfoComponent } from './legalinfo/legalinfo.component';
import { IntroComponent } from './intro/intro.component';
import { QrpageComponent } from './qrpage/qrpage.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    DialogpopupComponent,
    PrivacyComponent,
    LegalinfoComponent,
    IntroComponent,
    QrpageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    NgxQRCodeModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    NgxSpinnerModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  entryComponents: [DialogpopupComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
