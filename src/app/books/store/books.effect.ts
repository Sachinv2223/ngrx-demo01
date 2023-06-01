import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { BooksService } from "../books.service";
import { Store, select } from "@ngrx/store";
import { EMPTY, map, mergeMap, switchMap, withLatestFrom } from "rxjs";
import { booksFetchAPISuccess, invokeBooksAPI, invokeSaveNewBookAPI, invokeUpdateBookAPI, saveNewBookAPISucess, updateBookAPISucess } from "./books.action";
import { selectBooks } from "./books.selector";
import { Appstate } from "src/app/shared/store/appstate";
import { setAPIStatus } from "src/app/shared/store/app.action";

@Injectable()
export class BooksEffect {
    constructor(
        private actions$: Actions,
        private booksService: BooksService,
        private store: Store,
        private appStore: Store<Appstate>
    ) { }

    loadAllBooks$ = createEffect(() =>
        // this.actions$.pipe(
        //     ofType(invokeBooksAPI),
        //     withLatestFrom(this.store.pipe(select(selectBooks))),
        //     mergeMap(([_action, booksFormStore]) => {
        //         if (booksFormStore.length > 0) { return EMPTY; }
        //         return this.booksService.getBooks().pipe(map((data) => booksFetchAPISuccess({ allBooks: data })));
        //     })
        // )
        this.actions$.pipe(
            ofType(invokeBooksAPI),
            switchMap(() => {
                console.log('Invoked AllBooks$');
                return this.booksService.getBooks().pipe(map((data) => booksFetchAPISuccess({ allBooks: data })));
            })
        )
    );

    saveNewBook$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeSaveNewBookAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }));
                return this.booksService.addBook(action.newBook).pipe(
                    map((data) => {
                        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } }));
                        return saveNewBookAPISucess({ newBook: data });
                    })
                );
            })
        );
    });

    updateBookAPI$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(invokeUpdateBookAPI),
            switchMap((action) => {
                this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: '' } }));
                return this.booksService.updateBook(action.updateBook).pipe(
                    map((data) => {
                        this.appStore.dispatch(setAPIStatus({ apiStatus: { apiResponseMessage: '', apiStatus: 'success' } }));
                        return updateBookAPISucess({ updateBook: data });
                    })
                );
            })
        );
    });
}