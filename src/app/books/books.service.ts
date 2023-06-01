import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Books } from './store/books';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get<Books[]>('http://localhost:3000/books');
  }

  addBook(payload: Books) {
    return this.http.post<Books>('http://localhost:3000/books', payload);
  }

  updateBook(payload: Books) {
    return this.http.put<Books>(`http://localhost:3000/books/${payload.id}`, payload);
  }

  deleteBook(id: number) {
    return this.http.delete<Books>(`http://localhost:3000/books/${id}`);
  }

}
