import { Component } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
    this.router.navigate(["/"]);
  }

  // isLoggedIn(): Promise<boolean> | boolean {
  //   return this.authService
  //     .isLoggedIn()
  //     .then(user => {
  //       if (user) return true;

  //       return false;
  //     })
  //     .catch(() => {
  //       return false;
  //     });
  // }

  isLoggedIn(): boolean {
    console.log("Chamou");
    return false;
  }
}
