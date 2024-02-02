import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll } from '@ionic/angular';
import { Article } from 'src/app/interfaces/Index';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit{

  @ViewChild( IonInfiniteScroll ) infiniteScroll: IonInfiniteScroll;

  public categories: string[] = [
    'general',
    'business',
    'entertainment',
    'health',
    'science',
    'sports',
    'technology'
  ]
  public selectedCategory: string = this.categories[0];
  public articles: Article[] = [];

  constructor(private _newsService : NewsService) {}

  ngOnInit(){
    this._newsService.getTopHeadlinesByCategory(this.selectedCategory)
    .subscribe(articles => {
      console.log(articles);
      this.articles = [...articles];
    })
  }

  segmentChanged(event:Event) {
    this.selectedCategory = (event as CustomEvent).detail.value;
    this._newsService.getTopHeadlinesByCategory(this.selectedCategory)
    .subscribe(articles => {
      console.log(articles);
      this.articles = [...articles];
    })
  }

  loadData() {
    this._newsService.getTopHeadlinesByCategory(this.selectedCategory, true)
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
