import { Component, OnInit } from '@angular/core';
import SockJS from 'sockjs-client';
import * as $ from 'jquery';
import {Stomp} from '@stomp/stompjs';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.css']
})
export class AgentComponent implements OnInit {

  private serverUrl = 'http://localhost:8080/socket';
  private title = 'Bankerise';
  private stompClient;
  private firstsentmsg = 'mysg';
  private agent = null ;
  private   firstName = null;
  private lastName = null;
  loginForm: any;
  listMsg;

  constructor(private http: HttpClient,
              private userService: UserService, private router: Router ) {
    this.initializeWebSocketConnection();
  }
ngOnInit(): void {
    this.showAgent();
}

  initializeWebSocketConnection() {
    const ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe('/chat', (message) => {
        if (message.body) {
          $('.msg_history').append(/*'<div class="incoming_msg"> <div class="incoming_msg_img">'*/
            // + ' <img src="https://ptetutorials.com/images/user-profile.png" alt="sunil">'
            + '</div><div class="received_msg"> <div class="received_withd_msg"> <p>' + message.body +
          '</p><!--<span class="time_date"> 11:01 AM    |    Yesterday</span>--></div> </div> </div>');
          console.log(message.body);
        }
      });
    });
  }

  sendMessage(message) {
    this.stompClient.send('/app/sendforclient/message' , {}, message);
    $('#input-agent-chat').val('');
    $('.msg_history').append('<div class="outgoing_msg"><div class="sent_msg"><p>' + message +
      '</p></div> </div>');
    this.userService.saveMessage(message);

  }
  showAgent() {
  this.http.get('http://localhost:8080/api/agent/all').subscribe((data) => {
  console.log (data);
  this.agent = data;
  },
    error1 => console.log(error1));
  }

  saveReciever(agent) {
    // $('.msg_history').html('');
    this.userService.reciver = agent;
    this.userService.msgHistoryByAgent(agent).subscribe(data => {
       this.listMsg = data;
       console.log(this.listMsg);
     });

  }
  setStatu() {
    const urlUpdateStatus = 'http://localhost:8080/api/agent/statu';
    /*const status = {
      userName: this.userService.getUserData().userName,
      status: false
    }*/
    const userName = this.userService.getUserData();
    this.http.post(urlUpdateStatus, userName).subscribe();
    this.router.navigate(['/sign-in']);
  }
}
