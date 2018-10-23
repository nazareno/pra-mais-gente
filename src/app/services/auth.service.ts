import { Injectable } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";
import { Observable } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";
import { Router } from "@angular/router";

import { first } from "rxjs/operators";

import * as firebase from "firebase";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;
  private additionalUserInfo: any = {};
  private _isLoggedIn: boolean = false;
  private isLoading: boolean = false;

  private PHOTO_SIZE = { width: 720, height: 720 };

  users: Observable<any[]>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router
  ) {
    this.user = afAuth.user;
    this.isLoading = true;

    this.user.subscribe(user => {
      this.isLoading = false;
      if (user) {
        this.userDetails = user;
        this._isLoggedIn = true;
      } else {
        this.userDetails = null;
        this._isLoggedIn = false;
      }
    });

    if (this.isLoggedIn()) {
      this.db
        .object("users/" + localStorage.getItem("userID"))
        .valueChanges()
        .subscribe(action => {
          this.additionalUserInfo = action;
        });
    }
  }

  login = () => {
    const provider = new auth.FacebookAuthProvider();
    provider.addScope("user_birthday");
    provider.addScope("user_gender");

    this.afAuth.auth
      .signInWithPopup(provider)
      .then(data => {
        const usersRef = this.db.list("users");

        const { profile } = data.additionalUserInfo as any;
        const { accessToken } = data.credential as any;

        const photoURL =
          data.user.photoURL +
          "?type=large&width=" +
          this.PHOTO_SIZE.width +
          "&height=" +
          this.PHOTO_SIZE.height;

        this.additionalUserInfo = {
          id: profile.id,
          name: profile.name,
          firstName: profile.name.split(" ")[0],
          gender: profile.gender,
          age: this.calculateAge(new Date(profile.birthday)),
          photoURL
        };

        usersRef.set(profile.id, this.additionalUserInfo);

        localStorage.setItem("userID", profile.id);
        localStorage.setItem("facebookToken", accessToken);

        console.log(data);

        this.router.navigate(["/contar"]);
      })
      .catch(err => console.log(err.message));
  };

  private calculateAge = date => {
    var diff_ms = Date.now() - date.getTime();
    var age_dt = new Date(diff_ms);

    return Math.abs(age_dt.getUTCFullYear() - 1970);
  };

  isLoggedIn = () => {
    return this.afAuth.authState.pipe(first()).toPromise();
  };

  logout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("facebookToken");
    this.afAuth.auth.signOut();
  };

  getUserDetails = () => {
    return this.additionalUserInfo;
  };
}
