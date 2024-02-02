import { Component, OnInit, ViewChild } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { Article } from 'src/app/interfaces/Index';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  @ViewChild( IonInfiniteScroll ) infiniteScroll: IonInfiniteScroll;

  public articles: Article[] = [];

  constructor( private _newsService : NewsService) {}

  ngOnInit(){
    this._newsService.getTopHeadlines()
      .subscribe( articles => this.articles.push(...articles));
  }

  loadData() {
    this._newsService.getTopHeadlinesByCategory('business', true)
      .subscribe(articles => {

        if (articles.length === this.articles.length){
          this.infiniteScroll.disabled = true;
          //event.target.disabled = true;
          console.log("Infinite Scroll Finished");
          return;
        }

        this.articles = articles;
        this.infiniteScroll.complete();
        //event.target.complete(); 
        console.log("Infinite Scroll Continue...");
      })    

  }

}
