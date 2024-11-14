import { Inject, Injectable, InjectionToken, OnInit } from '@angular/core';
import { Article } from './article';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  private articles: {
    articles: Observable<Article[]>;
    articlesDeleted: Observable<Article[]>;
  } = this.getFromLocalStorage()

  private writeTable: Article[] = [];
  private readTable: Article[] = [];

  private write: string;
  private read: string;

  constructor(
    @Inject('writeTable') writeTable: string,
    @Inject('readTable') readTable: string
  ) {
    this.writeTable = (this as any)[writeTable];
    this.write = writeTable;
    this.readTable = (this as any)[readTable];
    this.read = readTable;
  }

  // Création d'un article
  create(article: Article): void {
    this.writeTable.push(article);
    this.setDataLocalStorage(this.write, this.writeTable);
  }

    // // Restaurion d'un article
    // update(article: Article) {
    //   this.create(article);
    //   const index = this.readTable.findIndex((x: Article) => x.id === article.id);
    //   // Suppression de l'article du tableau
    //   this.readTable.splice(index, 1);
    //   this.setDataLocalStorage(this.read, this.readTable);
    // }

  // Suppression d'un article
  update(article: Article) {
    this.readTable.push(article);
    // Récupération de l'index de l'article à supprimer
    const index = this.writeTable.findIndex(
      (x: Article) => x.id === article.id
    );
    // Suppression de l'article du tableau
    this.writeTable.splice(index, 1);
    this.setDataLocalStorage(this.write, this.writeTable);
    this.setDataLocalStorage(this.read, this.readTable);
  }

  setDataLocalStorage(name: string, data: Article[]) {
    localStorage.setItem(`${name}`, JSON.stringify(data));
  }

  getDataLocalStorage(name: string) {
    const stringData = localStorage.getItem(`${name}`);
    return JSON.parse(stringData || '[]');
  }

  getFromLocalStorage(): {
    articles: Observable<Article[]>;
    articlesDeleted: Observable<Article[]>;
  } {
    this.writeTable = this.getDataLocalStorage(this.write);
    this.readTable = this.getDataLocalStorage(this.read);

    if (this.write === '_articles') {
      return {
        articles: of(this.writeTable),
        articlesDeleted: of(this.readTable)
      }
    } else {
      return {
        articles: of(this.readTable),
        articlesDeleted: of(this.writeTable)
      }
    }


    // if (this.write === '_articles') {
    //   return {
    //     articles: of(this.writeTable),
    //     articlesDeleted: of(this.readTable),
    //   };
    // } else {
    //   return {
    //     articles: of(this.readTable),
    //     articlesDeleted: of(this.writeTable),
    //   };
    // }
  }
}
