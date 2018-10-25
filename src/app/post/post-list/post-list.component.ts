import { Component, OnInit } from "@angular/core";
import { Post } from "../post";
import { PostService } from "../post.service";
import { PostDetailsComponent } from "../post-details/post-details.component";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"],
  providers: [PostService]
})
export class PostListComponent implements OnInit {
  posts: Post[];
  loading: boolean;
  selectedPost: Post;

  constructor(
    private postService: PostService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.authService.getPosts().subscribe(posts => {
      this.posts = posts as Post[];
      console.log(this.posts);
      this.loading = false;
    })
  }

  private getIndexOfPost = (postId: String) => {
    return this.posts.findIndex(post => {
      return post._id === postId;
    });
  };

  selectPost(post: Post) {
    this.selectedPost = post;
  }

  createNewPost() {
    var post: Post = {
      owner: "",
      occupation: "",
      whoIAmToFamily: "",
      eduPrograms: "",
      firstGraduated: false
    };

    // By default, a newly-created post will have the selected state.
    this.selectPost(post);
  }

  deletePost = (postId: String) => {
    var idx = this.getIndexOfPost(postId);
    if (idx !== -1) {
      this.posts.splice(idx, 1);
      this.selectPost(null);
    }
    return this.posts;
  };

  addPost = (post: Post) => {
    this.posts.push(post);
    this.selectPost(post);
    return this.posts;
  };

  updatePost = (post: Post) => {
    var idx = this.getIndexOfPost(post._id);
    if (idx !== -1) {
      this.posts[idx] = post;
      this.selectPost(post);
    }
    return this.posts;
  };
}
