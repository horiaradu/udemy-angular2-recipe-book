import * as firebase from "firebase";
import { Injectable, OnInit } from "@angular/core";
import { fromPromise } from "rxjs/observable/fromPromise"
import { of } from "rxjs/observable/of"
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {
  private _isAuthenticated = new BehaviorSubject(false);

  constructor(private router: Router) { }

  signupUser(email: string, password: string) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => console.error(error));
  }

  signinUser(email: string, password: string) {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this._isAuthenticated.next(true);
        this.router.navigate(['/']);
      })
      .catch(error => console.error(error));
  }

  signout() {
    firebase.auth().signOut()
      .then(() => this._isAuthenticated.next(false));
  }

  getToken() {
    if (firebase.auth().currentUser) {
      return fromPromise(firebase.auth().currentUser.getIdToken());
    } else {
      return of(false);
    }
  }

  isAuthenticated() {
    this.getToken()
      .subscribe(token => this._isAuthenticated.next(!!token))
    return this._isAuthenticated.asObservable();
  }
}

