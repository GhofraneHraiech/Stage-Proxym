import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(private http: HttpClient,
              private userService: UserService) {
  }

  sender;
  reciever;
  message;

  ngOnInit() {
  }

  saveMessage(message) {
  }

}
