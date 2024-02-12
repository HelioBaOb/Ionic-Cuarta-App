import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/Index';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent  implements OnInit {

  @Input() noticias: Article[] = [];
  @Input() enFavoritos = false;


  constructor() { }

  ngOnInit() {
  }

}
