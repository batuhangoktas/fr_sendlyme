import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TestService} from '../test.service';
import {ApiService} from '../api.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {

  title = 'SendlyMe';
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value = '';
  private timer;
  list;
  private userId: string;
  hasSessionSync = false;
  interval = null;
  lastSessionId = '';
  LANGFLAG = 'null';

  constructor(private router: Router, private service: TestService, private apiService: ApiService,  private translate: TranslateService) { }


  ngOnInit() {

    debugger;
    this.translate.get('LANGFLAG').subscribe(params => {this.LANGFLAG = params; });
  }

  ngAfterContentInit(){
    this.getCreateId();
  }

  getCreateId() {
    if (this.hasSessionSync) {
      clearInterval(this.interval);
    }
    else {

      let qrCodeElement = document.getElementById('qrCode');
      qrCodeElement.style.opacity = '0.1';

      this.apiService.getCreateSession()
        .subscribe((res) => {
            this.value = (res["data"].sessionId);
            this.userId = res["data"].userId;
            this.hasSessionSync = false;
            if (this.interval == null) {
              this.interval = setInterval(this.getCreateId.bind(this), 45000);
            }
            this.getHasSyncSession(this.value);
            qrCodeElement.style.opacity = '1';
          }
          ,
          (err) => {
            console.log(err);
            this.apiService.getCreateSession();
          });

    }



  }
  getHasSyncSession(sessionId) {


    if (sessionId === this.value) {
      setTimeout(() => {
        this.apiService.getHasSyncSession(this.value)
          .subscribe((res) => {
              if (res['status']) {
                this.hasSessionSync = true;
                localStorage.setItem('userId', this.userId);
                localStorage.setItem('sessionId', this.value);
                this.router.navigateByUrl('/menu', {state: {userId: this.userId, session: this.value}});
              } else {

                this.getHasSyncSession(sessionId);

              }

            }
            ,
            (err) => {
              console.log(err);
            });

      }, 2000);
    }

  }
}

