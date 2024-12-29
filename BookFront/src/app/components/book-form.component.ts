import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Book } from '../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [FormsModule],
  template: `
    <form (ngSubmit)="onSubmit()" #bookForm="ngForm" class="book-form">
      <div class="form-group">
        <label for="id">Book ID:</label>
        <input
          type="number"
          id="id"
          name="id"
          [(ngModel)]="bookData.id"
          [readonly]="book !== undefined"
          required
        />
      </div>
      <div class="form-group">
        <label for="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          [(ngModel)]="bookData.title"
          required
        />
      </div>
      <div class="form-group">
        <label for="author">Author:</label>
        <input
          type="text"
          id="author"
          name="author"
          [(ngModel)]="bookData.author"
          required
        />
      </div>
      <div class="form-group">
        <label for="isbn">ISBN:</label>
        <input
          type="text"
          id="isbn"
          name="isbn"
          [(ngModel)]="bookData.isbn"
          required
        />
      </div>
      <div class="form-group">
        <label for="publicationDate">Publication Date:</label>
        <input
          type="date"
          id="publicationDate"
          name="publicationDate"
          [(ngModel)]="bookData.publicationDate"
          required
        />
      </div>
      <button type="submit">{{ book ? 'Update' : 'Add' }} Book</button>
    </form>
  `,
  styles: [`
    .book-form {
      max-width: 400px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .form-group {
      margin-bottom: 15px;
    }
    .form-group label {
      display: block;
      margin-bottom: 5px;
    }
    .form-group input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #45a049;
    }
  `],
})
export class BookFormComponent implements OnChanges {
  @Input() book?: Book; // Used for editing existing books
  @Output() save = new EventEmitter<Book>(); // Emit full Book object including id

  bookData: Book = {
    id: 0, // Default id for a new book
    title: '',
    author: '',
    isbn: '',
    publicationDate: new Date().toISOString().split('T')[0], // Default to current date in YYYY-MM-DD
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['book'] && changes['book'].currentValue) {
      this.bookData = { ...this.book! }; // Copy book data for editing
    }
  }

  onSubmit() {
    // Log the submitted data to the console
    console.log('Submitted Book Data:', this.bookData);

    // Emit the bookData for saving
    this.save.emit(this.bookData);

    // Reset the form if adding a new book
    if (!this.book) {
      this.bookData = {
        id: 0,
        title: '',
        author: '',
        isbn: '',
        publicationDate: new Date().toISOString().split('T')[0],
      };
    }
  }
}
