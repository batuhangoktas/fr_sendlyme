import {Component, HostListener} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private translate: TranslateService) {
    translate.addLangs(['en', 'tr']);
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|tr/) ? browserLang : 'en');
  }
}
