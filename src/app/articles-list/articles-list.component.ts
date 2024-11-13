import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Article } from '../common/article';
import { ArticleService } from '../common/article.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './articles-list.component.html',
  styleUrl: './articles-list.component.css',
  providers: [
    ArticleService,
    { provide: 'writeTable', useValue: '_articles' },
    { provide: 'readTable', useValue: '_articlesDeleted' }
  ],
})
export class ArticlesListComponent {
  private articleService: ArticleService = inject(ArticleService);
  article: Article = {
    id: '',
    name: '',
    price: '',
    contact: '',
    stock: '',
  };

  // Liste des articles disponibles
  articles$: Observable<Article[]> =
    this.articleService.getFromLocalStorage().articles;

  //Création d'un nouvel article et ajout au tableau
  createArticle(article: Article): void {
    this.articleService.create('create', article);
  }

  // Suppression d'un article
  deleteArticle(article: Article): void {
    this.articleService.delete(article);
  }
}
