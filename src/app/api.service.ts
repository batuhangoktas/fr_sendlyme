import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    adress = '';
   localHost = 'http://localhost:8080/';
   server = 'https://sendly.me/';
  constructor(private http: HttpClient) {
this.adress = this.server;
  }
  getCreateSession() {

    return this.http.get(this.adress + 'sendlyme/session/createsession?');
  }
  getHasSyncSession(sessionId) {
    return this.http.get(this.adress + 'sendlyme/session/hassessionsync?' + 'sessionid=' + sessionId);
  }
  getReceiveFileList(userId, sessionId) {
    return this.http.get(this.adress + 'sendlyme/session/filereceive?userid=' + userId + '&' + 'sessionid=' + sessionId);
  }
  getFileDownload(fileId) {
    const formData: FormData = new FormData();
    formData.append('fileid', fileId);

    return this.http.get(this.adress + 'sendlyme/session/download?fileid=' + fileId, { responseType: 'blob' });
  }
  getFileUpload(file, sessionId, userId) {
    const formData = new FormData();
    formData.append('sessionid', sessionId);
    formData.append('userid', userId);
    formData.append('file', file);

    const headerMultiPart = new HttpHeaders();
    headerMultiPart.append('Content-Type', 'multipart/form-data');
    headerMultiPart.append('Accept', 'application/json');

    const options = { headers: headerMultiPart };

    return this.http.post(this.adress + 'sendlyme/session/upload', formData, options);
  }
  getTookFile(fileId) {
    return this.http.get(this.adress + 'sendlyme/session/tookfile?fileid=' + fileId);
  }
}
