import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'rb-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) { }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: environment.apiKey,
      authDomain: environment.authDomain,
    });

    setTimeout(() => this.authService.isAuthenticated(), 1000);
  }
}
