import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { Book } from '../models/book';
import { API_CONFIG } from './api.config';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = `${API_CONFIG.baseUrl}/books`;
  private booksSubject = new BehaviorSubject<Book[]>([]);

  constructor(private http: HttpClient) {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.http.get<Book[]>(this.apiUrl)
      .subscribe(books => this.booksSubject.next(books));
  }

  getBooks(): Observable<Book[]> {
    return this.booksSubject.asObservable();
  }

  getNextId(): Observable<number> {
    return this.getBooks().pipe(
      map(books => {
        if (books.length === 0) return 1;
        return Math.max(...books.map(book => book.id)) + 1;
      })
    );
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(this.apiUrl, book).pipe(
      tap(() => this.loadBooks())
    );
  }

  updateBook(book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/${book.id}`, book).pipe(
      tap(() => this.loadBooks())
    );
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadBooks())
    );
  }
}