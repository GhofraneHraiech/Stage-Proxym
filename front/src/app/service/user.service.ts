import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly rootUrl = 'http://localhost:8080/api/client/auth?userName=';
  reciver;
  reciverA;
  data;
  constructor(private http: HttpClient) { }

  userAuthentication(userName) {
    const data = 'username=' + userName ;
    return new Observable(observer => {
      this.http.get(this.rootUrl + userName).subscribe((result: any) => {
        observer.next(result);
      }, error => {
        observer.error(error);
      });
    });

  }
  agentAuthentication(userName) {
    const data = 'username=' + userName ;
    return new Observable(observer => {
      this.http.get( 'http://localhost:8080/api/agent/auth?userName=' + userName).subscribe((result: any) => {
        observer.next(result);
      }, error => {
        observer.error(error);
      });
    });

  }

  getUserData() {
    return JSON.parse(localStorage.getItem('userToken'));
  }
  getUserDataAgent() {
    return JSON.parse(localStorage.getItem('userToken2'));
  }

  saveMessage(msg) {
    const urlMsg = 'http://localhost:8080/api/message/add';
    const msgObject = {
      data: msg,
      from: this.getUserData(),
      to: this.reciver,
      date: new Date()
    };
    console.log('objMsg', msgObject);
    return this.http.post(urlMsg, msgObject).subscribe();
  }
  saveMessageAgent(msg) {
    const urlMsg = 'http://localhost:8080/api/message/add';
    const msgObject = {
      data: msg,
      from: this.getUserDataAgent().userName,
      to: this.reciver,
      date: new Date()
    };
    console.log('objMsg', msgObject);
    return this.http.post(urlMsg, msgObject).subscribe();
  }

  msgHistoryByAgent(agent) {
    return new Observable(observer => {
      this.http.get('http://localhost:8080/api/message/historic?from=' + this.getUserData() + '&to=' + agent ).subscribe
      ((msg) => {
        console.log(msg);
        observer.next(msg);
        /*$('.msg_history').append('<div class="outgoing_msg"><div class="sent_msg"><p>' + msg +
          '</p></div> </div>');*/
      });
    });
}
}
