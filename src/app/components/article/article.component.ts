import { Component, Input } from '@angular/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx'
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { Article } from 'src/app/interfaces/Index';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx'
import { StorageService } from 'src/app/services/storage.service';


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {

  @Input() article: Article;
  @Input() index : number;

  constructor(
    private iab: InAppBrowser,
    private paltform:Platform,
    private actionSheetCtrl: ActionSheetController,
    private socialSharing: SocialSharing,
    private storageService: StorageService
    ) { }

  openArticle() {
    //window.open(this.article.url, '_blank');
    if(this.paltform.is('ios' || this.paltform.is('android'))){
      const browser = this.iab.create(this.article.url, '_blank');
      browser.show();
      return;
    }

    window.open(this.article.url, '_blank');

  }

  async onOpenMenu() {

    const articleInFavorites = this.storageService.articleInFavorites(this.article);

    const normalBtns: ActionSheetButton[] = [
      {
        text: articleInFavorites ? 'Remover De Favoritos' : 'Favorito',
        icon: articleInFavorites ? 'heart' : 'heart-outline',
        handler: () => {
          this.onToggleFavorite();
        }
      },
      {
        text: 'Cancelar',
        icon: 'close-outline',
        role: 'calcel',
        cssClass: 'secondary',
      }
    ]

    const sharebtn: ActionSheetButton ={
      text: 'Compartir',
      icon: 'share-outline',
      handler: () => {
        this.onShareArticle();
      }
    }

    if(this.paltform.is('capacitor')){
      normalBtns.unshift(sharebtn);
    }
    
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      buttons: normalBtns
    })


    

    await actionSheet.present();
  }

  onToggleFavorite() {
    this.storageService.saveRemoveArticle(this.article);
  }

  onShareArticle() {
    const {title, source, url} = this.article;
    
    this.socialSharing.share(
      '¡Check out this news titled '+title+'! ',
      source.name,
      '',
      url
    );
  }

}
