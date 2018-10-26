import { Component, OnInit } from '@angular/core';
import { Post } from '../post';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-post-share',
  templateUrl: './post-share.component.html',
  styleUrls: ['./post-share.component.css']
})
export class PostShareComponent implements OnInit {

  photoURL: string;
  postImg: Post;
  loading: boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loading = true;

    this.authService.getUserDetails().subscribe(user => {
      this.photoURL = user.photoURL;
      setTimeout(() => {
        if (typeof user !== 'undefined') {
          this.authService.getUserPost(user).subscribe(post => {
            this.postImg = post as Post;
            this.loading = false;
          });
        }
      }, 1200);
    });
  }

}
