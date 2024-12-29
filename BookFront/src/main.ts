import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
import { BookFormComponent } from './app/components/book-form.component';
import { BookListComponent } from './app/components/book-list.component';
import { BookService } from './app/services/book.service';
import { Book } from './app/models/book';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, BookFormComponent, BookListComponent],
  template: `
    <div class="container">
      <h1>Book Management</h1>
      
      <h2>{{ editingBook ? 'Edit Book' : 'Add New Book' }}</h2>
      <app-book-form
        [book]="editingBook"
        (save)="saveBook($event)"
      ></app-book-form>

      <h2>Book List</h2>
      <app-book-list
        [books]="books"
        (edit)="editBook($event)"
        (delete)="deleteBook($event)"
      ></app-book-list>
    </div>
  `,
  styles: [`
    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
    }
  `]
})
export class App implements OnInit {
  books: Book[] = [];
  editingBook?: Book;

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks().subscribe(books => {
      this.books = books;
    });
  }

  saveBook(book: Book) {
    if (this.editingBook) {
      this.bookService.updateBook(book).subscribe(() => {
        this.editingBook = undefined;
      });
    } else {
      this.bookService.addBook(book).subscribe();
    }
  }

  editBook(book: Book) {
    this.editingBook = { ...book };
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe();
    }
  }
}

bootstrapApplication(App, {
  providers: [
    provideHttpClient()
  ]
}).catch(err => console.error(err));