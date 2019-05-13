import { Component, OnInit } from '@angular/core';
import {TestService} from '../test.service';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  title = 'SendlyMe';
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value = 'db72d39226b440f1b9cba2067e909abe';
  private timer;
  list;
  private userId: string;

  constructor(private router: Router, private service: TestService, private apiService: ApiService) { }

  ngOnInit() {

   this.list = this.service.list;
   this.getCreateId();
   //this.loop();

  }
  getCreateId() {
    debugger;

    this.apiService.getCreateSession()
        .subscribe( (res) => {
            this.value = (res["data"].sessionId);
            this.userId = res["data"].userId;
            this.getHasSyncSession(this.value);
          }
          ,
          (err) => {
            console.log(err);
            this.value = 'BBBB';
          });




  }
  getHasSyncSession(sessionId: string) {

    setTimeout(() => {
      this.apiService.getHasSyncSession(sessionId)
        .subscribe( (res) => {
            console.log(res);
            if (res['status']) {
              localStorage.setItem('userId', this.userId);
              localStorage.setItem('sessionId', sessionId);
              this.router.navigateByUrl('/menu',  { state: { userId: this.userId, session: sessionId } });
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

