import { FETCH_BOOKS } from './actionType';
import axios from "axios";

export const fetchBooks = () => {
  return async dispatch => {
    const response = await axios.get("https://the-index-api.herokuapp.com/api/books/");
    const books = response.data;
    dispatch({
      type: FETCH_BOOKS,
      payload: books
    })
  }
};
