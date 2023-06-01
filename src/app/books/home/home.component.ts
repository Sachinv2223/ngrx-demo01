import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { invokeBooksAPI } from '../store/books.action';
import { selectBooks } from '../store/books.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books$ = this.store.pipe(select(selectBooks));
  

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(invokeBooksAPI());
  }

}
