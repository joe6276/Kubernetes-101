import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms"
import { BooksService } from './books.service';
import { Book } from './Types/Book';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
    books: Book[]= []
   ngOnInit(): void {
     this.bookService.getBooks().subscribe(theBooks=>{
      this.books=theBooks
     })
   }
  constructor(private bookService:BooksService) {
  
    
  }
  bookTitle:string="";
  bookPrice:string="";

  onFormSubmit(form:any){
    this.bookService.addBook({...form.value, price: +form.value}).subscribe((res)=>{
      console.log(res);
      
    })
  }

}
