import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.css']
})
export class FabComponent implements OnInit {

  hasStory: boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.hasStory = false;
    this.authService.getUserDetails().subscribe(user => {
      if (user !== null) {
        this.authService.getUserPost(user).subscribe(post => {
          this.hasStory = (post.datetime !== "");
        });
      }
    });
  }

}
