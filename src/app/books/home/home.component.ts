import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { invokeBooksAPI, invokeDeleteBookAPI } from '../store/books.action';
import { selectBooks } from '../store/books.selector';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Books } from '../store/books';
import { Appstate } from 'src/app/shared/store/appstate';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  books$ = this.store.pipe(select(selectBooks));


  constructor(private store: Store, private modalService: NgbModal, private appStore: Store<Appstate>) { }

  ngOnInit(): void {
    this.store.dispatch(invokeBooksAPI());
  }

  openDeleteModal(content: any, book: Books) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        if (result === 'Yes click') {
          this.deleteBook(book.id);
        }
      },
      (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  deleteBook(id: number) {
    this.store.dispatch(invokeDeleteBookAPI({ id: id }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus == 'success') {
        this.store.dispatch(invokeBooksAPI());
        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }));
      }
    });
  }

}
