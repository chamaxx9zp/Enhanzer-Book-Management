import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="book-list">
      <div *ngFor="let book of books" class="book-card">
        <h3>{{ book.title }}</h3>
        <p>Author: {{ book.author }}</p>
        <p>ISBN: {{ book.isbn }}</p>
        <p>Publication Date: {{ book.publicationDate | date }}</p>
        <div class="book-actions">
          <button (click)="edit.emit(book)" class="edit">Edit</button>
          <button (click)="delete.emit(book.id)" class="delete">Delete</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .book-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }
    .book-card {
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 15px;
      background-color: #f9f9f9;
    }
    .book-card h3 {
      margin: 0 0 10px 0;
      color: #333;
    }
    .book-card p {
      margin: 5px 0;
      color: #666;
    }
    .book-actions {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    button.edit {
      background-color: #2196F3;
    }
    button.delete {
      background-color: #f44336;
    }
    button {
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      opacity: 0.9;
    }
  `]
})
export class BookListComponent {
  @Input() books: Book[] = [];
  @Output() edit = new EventEmitter<Book>();
  @Output() delete = new EventEmitter<number>();
}