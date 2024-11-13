import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Article } from '../common/article';
import { Observable } from 'rxjs';
import { ArticleService } from '../common/article.service';

@Component({
  selector: 'app-articles-list-deleted',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './articles-list-deleted.component.html',
  styleUrl: './articles-list-deleted.component.css',
  providers: [
    ArticleService,
    { provide: 'writeTable', useValue: '_articlesDeleted' },
    { provide: 'readTable', useValue: '_articles' }
  ],
})
export class ArticlesListDeletedComponent {

  // Liste des articles non disponnible
  private articleService: ArticleService = inject(ArticleService);
  articlesDeleted$: Observable<Article[]> = this.articleService.getFromLocalStorage().articlesDeleted;

  /**
   * Restaure un article supprimé
   */
  restore(article: Article) {
    this.articleService.update(article);
  }
}
