import {Component, OnInit} from '@angular/core';
import {UserService} from '../../service/user.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  isLoginError = false;

  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit() {
  }

  OnSubmit(userName) {
    this.userService.userAuthentication(userName).subscribe((data: any) => {
        console.log(data);
        console.log(data.id);
        localStorage.setItem('userToken', JSON.stringify(data.userName));
        console.log('userdata', JSON.parse(localStorage.getItem('userToken')));
        this.router.navigate(['/agent']);

      },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }
}
