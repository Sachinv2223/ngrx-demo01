import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Books } from './books';

export const selectBooks = createFeatureSelector<Books[]>('mybooks');

export const selectBookById = (bookId: number) =>
    createSelector(selectBooks, (books: Books[]) => {
        let selectedBook = books.find((book) => book.id == bookId);
        return selectedBook ? selectedBook : null;
    });
