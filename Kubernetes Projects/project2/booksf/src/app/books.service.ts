import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddBook, Book } from './Types/Book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
api:string=" http://localhost:8000/books"
  constructor(private http:HttpClient) { }


  getBooks():Observable<Book[]>{
  return this.http.get<Book[]>(this.api)
  }

  addBook( newBook: AddBook):Observable<string>{
    return this.http.post<string>(this.api, newBook)
    }
}
