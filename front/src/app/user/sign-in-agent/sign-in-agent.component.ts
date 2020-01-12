import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-in-agent',
  templateUrl: './sign-in-agent.component.html',
  styleUrls: ['./sign-in-agent.component.css']
})
export class SignInAgentComponent implements OnInit {

  isLoginError = false;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }
  OnSubmit(userName) {
    this.userService.agentAuthentication(userName).subscribe((data: any) => {
        console.log(data);
        console.log(data.id);
        data.statu = true;
        console.log(data.statu);
        localStorage.setItem('userToken2', JSON.stringify(data));
        console.log('userdata2', JSON.parse(localStorage.getItem('userToken2')));
        this.router.navigate(['/client']);
      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }

}
