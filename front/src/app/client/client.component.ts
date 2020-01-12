import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import SockJS from 'sockjs-client';
import {Stomp} from '@stomp/stompjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  private serverUrl = 'http://localhost:8080/socket';
  private title = 'Client1';
  private stompClient;
  private client = null ;
  private statuClient = null ;


  constructor(private http: HttpClient, private userService: UserService , private router: Router) {
    this.initializeWebSocketConnection();
  }
  ngOnInit(): void {
    this.showClient();
  }
  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/chat2', (message) => {
        if (message.body) {
          $('.msg_history').append('<div class="incoming_msg"> <div class="incoming_msg_img">'
            // + ' <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">'
            + '</div><div class="received_msg"> <div class="received_withd_msg"> <p>' + message.body +
            '</p><!--<span class="time_date"> 11:01 AM    |    Yesterday</span>--></div> </div> </div>');
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    console.log(this.stompClient);
    this.stompClient.send('/app/send/message' , {}, message);
    $('#input-agent-chat').val('');
    $('.msg_history').append('<div class="outgoing_msg"><div class="sent_msg"><p>' + message +
      '</p> <span class="time_date"> 11:01 AM    |    Today</span> </div> </div>');
    this.userService.saveMessageAgent(message);
  }
  showClient() {
    this.http.get('http://localhost:8080/api/client/all').subscribe((data) => {
        console.log (data);
        this.client = data;
      },
      error1 => console.log(error1));
  }
  saveReciever(client) {
    this.userService.reciver = client;
    this.userService.msgHistoryByAgent(client);

  }
  saveMessage(message) {
    console.log(message);
    this.userService.saveMessage(message);
  }
  setStatu() {
    const urlUpdateStatus = 'http://localhost:8080/api/client/statu';
    /*const status = {
      userName: this.userService.getUserData().userName,
      status: false
    }*/
    const userName = this.userService.getUserDataAgent().userName;
    this.http.post(urlUpdateStatus, userName).subscribe();
    this.router.navigate(['/sign-inAgent']);
  }
}
