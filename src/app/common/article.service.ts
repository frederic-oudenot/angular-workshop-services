import { Inject, Injectable, InjectionToken, OnInit } from '@angular/core';
import { Article } from './article';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private _articles: Article[] = [];
  private _articlesDeleted: Article[] = [];
  private writeTable: string = '';
  private readTable: string = '';

  constructor(
    @Inject('writeTable') writeTable: string,
    @Inject('readTable') readTable: string
  ) {
    this.writeTable = writeTable;
    this.readTable = readTable;
    console.log("🚀 ~ ArticleService ~ readTable:", readTable)
  }

  // Création d'un article
  create(action: string, article: Article): void {
    // Ajout de l'article à la liste des articles
    switch (action) {
      case 'create':
        this._articles.push(article);
        localStorage.setItem('articles', JSON.stringify(this._articles));
        break;
      case 'delete':
        this._articlesDeleted.push(article);
        localStorage.setItem(
          'articlesDeleted',
          JSON.stringify(this._articlesDeleted)
        );
        break;
      default:
        break;
    }
  }

  // Suppression d'un article
  delete(article: Article) {
    this.create('delete', article);
    // Récupération de l'index de l'article à supprimer
    const index = this._articles.findIndex((x) => x.id === article.id);
    // Suppression de l'article du tableau
    this._articles.splice(index, 1);
    localStorage.setItem('articles', JSON.stringify(this._articles));
  }

  // Restaurion d'un article
  update(article: Article) {
    this.create('create', article);
    // Récupération de l'index de l'article à supprimer
    const index = this._articlesDeleted.findIndex((x) => x.id === article.id);
    // Suppression de l'article du tableau
    this._articlesDeleted.splice(index, 1);
    localStorage.setItem(
      'articlesDeleted',
      JSON.stringify(this._articlesDeleted)
    );
  }

  // Récupération des articles en format 'string'
  getFromLocalStorage(): {
    articles: Observable<Article[]>;
    articlesDeleted: Observable<Article[]>;
  } {
    const articles = localStorage.getItem('articles');
    this._articles = JSON.parse(articles || '[]');

    const articlesDeleted = localStorage.getItem('articlesDeleted');
    this.readTable =JSON.parse(articlesDeleted || '[]');
    console.log("🚀 ~ ArticleService ~ getFromLocalStorage ~ this.readTable:", this.readTable)
    this._articlesDeleted = JSON.parse(articlesDeleted || '[]');
    console.log("🚀 ~ ArticleService ~ getFromLocalStorage ~ this._articlesDeleted:", this._articlesDeleted)

    return {
      articles: of(this._articles),
      articlesDeleted: of(this._articlesDeleted),
    };
    // Récupération des articles en format 'string'
    // switch (view) {
    //   case 'createView': {
    //     // Récupération des articles en format 'string'
    //     const stringData = localStorage.getItem('articles');
    //     // Conversion des données de type 'string' en objet Json
    //     this._articles = JSON.parse(stringData || '[]');

    //     return of(this._articles);
    //   }
    //   case 'deleteView': {
    //     // Récupération des articles en format 'string'
    //     const stringData = localStorage.getItem('articlesDeleted');
    //     // Conversion des données de type 'string' en objet Json
    //     return of(this._articlesDeleted = JSON.parse(stringData || '[]'));
    //   }
    //   default:
    //     // Récupération des articles en format 'string'
    //     const stringData = localStorage.getItem('articles');
    //     // Conversion des données de type 'string' en objet Json
    //     return of(this._articles = JSON.parse(stringData || '[]'));
    // }
  }
}
