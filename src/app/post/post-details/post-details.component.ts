import { Component, Input, OnInit } from "@angular/core";

import { Post } from "../post";
import { PostService } from "../post.service";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "post-details",
  templateUrl: "./post-details.component.html",
  styleUrls: ["./post-details.component.css"]
})
export class PostDetailsComponent implements OnInit {
  eduProgramOptions = [
    { name: "Criação do ProUni", checked: false, value: 0 },
    { name: "Criação do ENEM e SiSu", checked: false, value: 1 },
    {
      name: "Mais vagas em Universidades Públicas",
      checked: false,
      value: 2
    },
    { name: "Novas Universidades Federais", checked: false, value: 3 },
    {
      name: "Novos campi de Universidades no interior",
      checked: false,
      value: 4
    },
    {
      name: "Novos campi de IFs no interior",
      checked: false,
      value: 5
    },
    { name: "Fortalecimento do FIES", checked: false, value: 6 },
    { name: "Cotas nas Universidades e IFs", checked: false, value: 7 },
    { name: "Universidade Aberta do Brasil", checked: false, value: 8 },
    { name: "Caminho da Escola", checked: false, value: 9 },
    {
      name: "Contratações em Universidades Públicas",
      checked: false,
      value: 10
    }
  ];

  // againstTo = [
  //   { name: "Escola sem partido", checked: false },
  //   { name: "Ensino à distância desde o ensino básico", checked: false },
  //   {
  //     name: "Proibição da discussão sobre sexualidade nas escolas",
  //     checked: false
  //   },
  //   { name: "Privatização das Universidades Federais", checked: false }
  // ];
  firstGraduatedOptions = {
    name: "Sou o primeiro da família a completar o ensino superior",
    checked: false,
    value: true
  };

  post: Post;
  postImg: Post;
  user: any;
  showImg: boolean;

  constructor(
    private postService: PostService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.createNewPost();
    this.authService.getUserDetails().subscribe(info => {
      this.user = info;
    });
    this.showImg = false;
  }

  createNewPost() {
    var post: Post = {
      owner: "",
      occupation: "",
      whoIAmToFamily: "",
      eduPrograms: "",
      firstGraduated: false,
      datetime: null,
      timestamp: 0
    };

    this.selectPost(post);
  }

  selectPost(post: Post) {
    this.post = post;
  }

  selectedOptions(list) {
    return list.filter(opt => opt.checked).map(opt => opt.name);
  }

  selectedEduProgramOptions() {
    return this.selectedOptions(this.eduProgramOptions);
  }

  selectedFirstGraduated() {
    return this.selectedOptions(this.eduProgramOptions);
  }

  createPost(post: Post) {
    post.user = this.user;
    post.owner = this.user.name;
    post.eduPrograms = this.selectedEduProgramOptions();
    post.datetime = new Date();
    this.postService.createPost(post).then(() => {
      this.createImage(post);
    });
  }

  updatePost(post: Post): void {
    this.postService.updatePost(post).then((updatedPost: Post) => {
      // this.updateHandler(updatedPost);
    });
  }

  deletePost(postId: String): void {
    this.postService.deletePost(postId).then((deletedPostId: String) => {
      // this.deleteHandler(deletedPostId);
    });
  }

  createImage(post): void {
    this.postImg = post;
    this.showImg = true;
  }
}
