import { Component } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  googleAuthUrl: string;
  facebookUrl:string | undefined;

  constructor() {
    this.googleAuthUrl = environment.apiBaseUrl + '/auth/google';
    this.facebookUrl = environment.apiBaseUrl + '/auth/facebook';
  }
}
