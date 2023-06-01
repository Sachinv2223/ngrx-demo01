import { createReducer, on } from "@ngrx/store";
import { Books } from "../store/books";
import { booksFetchAPISuccess, deleteBookAPISuccess, saveNewBookAPISucess, updateBookAPISucess } from "./books.action";

export const initialState: ReadonlyArray<Books> = [];

export const bookReducer = createReducer(
  initialState,
  on(booksFetchAPISuccess, (state, { allBooks }) => {
    return allBooks;
  })
);

on(saveNewBookAPISucess, (state: Books[], { newBook }) => {
  let newState = [...state];
  newState.unshift(newBook);
  return newState;
})

on(updateBookAPISucess, (state: Books[], { updateBook }) => {
  // let newState = [...state];
  // let updateBookIndex = state.findIndex((book) => book.id === updateBook.id);
  // if (updateBookIndex != -1) {
  //   newState[updateBookIndex] = updateBook;
  // }
  // return newState;
  let newState = [...state.filter((book: Books) => book.id != updateBook.id)];
  newState.unshift(updateBook);
  return newState;
})

on(deleteBookAPISuccess, (state: Books[], { id }) => {
  let newState = [...state.filter((book: Books) => book.id != id)];
  return newState;
})