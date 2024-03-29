import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {ApiService} from '../api.service';
import {Router} from '@angular/router';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {DialogpopupComponent} from '../dialogpopup/dialogpopup.component';
import {NgxSpinnerService} from 'ngx-spinner';
import {TranslateService} from '@ngx-translate/core';
import * as FileSaver from 'file-saver';
import {forEach} from '@angular/router/src/utils/collection';

export interface PeriodicElement {
  id: string;
  name: string;
  position: number;
  status: boolean;
}

export interface SendFileElement {
  file: any;
  name: string;
  position: number;
  status: boolean;
}


const ELEMENT_DATA: PeriodicElement[] = [

];

const SEND_DATA: SendFileElement[] = [

];


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})

export class MenuComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'selectaction'];
  displayedColumnsSend: string[] = ['position', 'name', 'sendaction'];
  dataSource = ELEMENT_DATA;
  dataSourceSend = SEND_DATA;
  userId: string;
  sessionId: string;
  private blob: Blob;
  private progressDialog: MatDialogRef<DialogpopupComponent, any>;
  sendFileCnt = 0;
  buttonDisabled = false;
  selectAction(item, event) {
    this.spinner.show();
this.apiService.getFileDownload(item.id)
      .subscribe( (data) => {
        this.spinner.hide();
        FileSaver.saveAs(data, item.name);

        this.apiService.getTookFile(item.id).subscribe((tookData) => {

          if(tookData['status'] === true) {
            let sendedMessage = '';
            this.translate.get('MenuPage.Downloaded').subscribe(params => {sendedMessage = params; });
            event._elementRef.nativeElement.innerText = sendedMessage;
            event.disabled = true;
          }

        });

        //     if (window.navigator.msSaveOrOpenBlob) { // IE 11+
    //       window.navigator.msSaveOrOpenBlob(data, item.name);
    //     } else if (navigator.userAgent.match('FxiOS')) { // FF iOS
    //     } else if (navigator.userAgent.match('CriOS')) { // Chrome iOS
    //   const reader = new FileReader();
    //   reader.onloadend =  (e) => {
    //     window.open(reader.result.toString());
    //   }
    //   reader.readAsDataURL(data);
    // } else if (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i)) { // Safari & Opera iOS
    //       console.log('iPad');
    //       const anchorElement = window.document.createElement('a');
    //       anchorElement.href = window.URL.createObjectURL(data);
    //       anchorElement.target = '_blank';
    //       anchorElement.download = item.name;
    //       const event = window.document.createEvent('MouseEvents');
    //       event.initEvent('click', true, false);
    //       anchorElement.dispatchEvent(event);
    //
    //   //     const urls = window.URL.createObjectURL(data);
    //   // window.open(urls);
    // } else {
    //       console.log('other');
    //       console.log(navigator.userAgent);
    //       const url = window.URL.createObjectURL(data);
    //       const a = document.createElement('a');
    //       document.body.appendChild(a);
    //       a.setAttribute('style', 'display: none');
    //       a.href = url;
    //       a.download = item.name;
    //       a.click();
    //       window.URL.revokeObjectURL(url);
    //       a.remove();
    //     }
      });
  }

  selectSendAllFile(cnt) {
    debugger;

    var fileInput = SEND_DATA[cnt];
    if (fileInput.status == true) {
      cnt++;
      this.selectSendAllFile(cnt);
    }
    else {
      this.spinner.show();
      this.apiService.getFileUpload(fileInput.file, this.sessionId, this.userId).subscribe(value => {
        this.spinner.hide();
        let sendedMessage = '';
        this.translate.get('MenuPage.SendedFile').subscribe(params => {
          sendedMessage = params;
        });
        // event._elementRef.nativeElement.innerText = sendedMessage;
        // event.disabled = true;
        this.sendFileCnt--;
        fileInput.status = true;
        cnt++;
        this.selectSendAllFile(cnt);
      });
    }
  }

  sendAction(fileInput) {

    this.spinner.show();
    this.apiService.getFileUpload(fileInput.file, this.sessionId, this.userId).subscribe(value => {
      this.spinner.hide();
      let sendedMessage = '';
      this.translate.get('MenuPage.SendedFile').subscribe(params => {sendedMessage = params; });
      // event._elementRef.nativeElement.innerText = sendedMessage;
      // event.disabled = true;
      this.sendFileCnt--;
      fileInput.status = true;
    });
  }

  constructor(private router: Router, private apiService: ApiService, public snackBar: MatSnackBar, private spinner: NgxSpinnerService, private translate: TranslateService) {
    this.sessionId = localStorage.getItem('sessionId');
    this.userId = localStorage.getItem('userId');
    // this.sessionId = this.router.getCurrentNavigation().extras.state.session;
    // this.userId = this.router.getCurrentNavigation().extras.state.userId;

  }

  ngOnInit() {
    this.dataSource = ELEMENT_DATA;
    this.getReceiveList(this.userId, this.sessionId);

  }
  @HostListener('window:unload', [ '$event' ])
  unloadHandler(event) {
    debugger;
  }

  @HostListener('window:beforeunload', [ '$event' ])
  beforeUnloadHander(event) {
    this.apiService.getFinishSession(this.sessionId)
      .subscribe((res) => {


      });

  }

  getReceiveList(userId: string, sessionId: string) {
    setTimeout(() => {

      this.apiService.getReceiveFileList(userId, sessionId)
        .subscribe( (res) => {
            console.log(res);
            // res['id']
            // res['name']
            // res['status']
            if (res['data'] != null) {
              if(res['data']['timeStatus'] == false)
              {

                let sessionTime = '';
                let okDialog = '';
                this.translate.get('MenuPage.SessionTime').subscribe(params => {sessionTime = params; });
                this.translate.get('MenuPage.Ok').subscribe(params => {okDialog = params; });

                const snackBarRef = this.snackBar.open(sessionTime, okDialog, {

                });

                snackBarRef.afterDismissed().subscribe(info => {
                  if (info.dismissedByAction === true) {
                    localStorage.removeItem('userId');
                    localStorage.removeItem('sessionId');
                    window.location = <any>'https://sendly.me';

                  }
                });
              }
              else
              {
                document.getElementById("minute").innerHTML =  res['data']['time'] ;

              if(res['data']['fileListModalList'].length > 0) {
              res['data']['fileListModalList'].forEach((valueReceive) => {
                const foundLocation = ELEMENT_DATA.find(e => e.id === valueReceive.id);
                if (foundLocation == null) {

                  ELEMENT_DATA.push({position: ELEMENT_DATA.length + 1,
                    name: valueReceive.name, status: valueReceive.status, id: valueReceive.id});
                  this.dataSource = ELEMENT_DATA;
                  this.dataSource = this.dataSource.slice();

                }
              });


            }}
            }

            this.getReceiveList(userId, sessionId);
          }
          ,
          (err) => {
            console.log(err);
          });

    }, 2000);
  }
  onReadStart(fileCount: number) {

  }


  onFileChange(fileInput: any) {
    debugger;
    var fileList;
    if (fileInput.target) {
      fileList = fileInput.target.files;
    }
    else if (fileInput.length > 0) {
      fileList = fileInput;
         }

    if (fileList) {

        for (let cnt = 0; cnt < fileList.length; cnt++) {


      if (fileList[cnt].size / 1024 / 1024 > 100) {

        let sizeLimit = '';
        let okDialog = '';
        this.translate.get('MenuPage.FileSizeLimit').subscribe(params => {sizeLimit = params; });
        this.translate.get('MenuPage.Ok').subscribe(params => {okDialog = params; });

        const snackBarRef = this.snackBar.open(sizeLimit, okDialog, {
          duration: 3000,
        });

        snackBarRef.afterDismissed().subscribe(info => {
          if (info.dismissedByAction === true) {
            document.getElementById('inputUpload').click();

          }
        });

        // const snackBarRef = this.snackBar.open('Dosya boyutu 100 mb\'dan küçük olmalıdır', 'Tamam');
        // snackBarRef.onAction().subscribe(() => {
        //   this.onFileChange(fileInput);
        // });
      } else {

        const reader = new FileReader();


        SEND_DATA.push({
          position: SEND_DATA.length + 1,
          name: fileList[cnt].name, status: false, file: fileList[cnt]
        });
        this.dataSourceSend = SEND_DATA;
        this.dataSourceSend = this.dataSourceSend.slice();


        // this.apiService.getFileUpload(fileList[0], this.sessionId, this.userId).subscribe(value => {
        //
        //
        // });
        //
        // reader.readAsDataURL(fileList[0]);
      }
      }
      this.sendFileCnt = 0;
        SEND_DATA.forEach(value => {
        if (value.status == false) {
          this.sendFileCnt++;
        }
      });
    }

  }
}

