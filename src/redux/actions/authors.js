import { FETCH_AUTHORS } from "./actionType";
import axios from "axios";

export const fetchAuthors = () => {
  return async dispatch => {
    const response = await axios.get("https://the-index-api.herokuapp.com/api/authors/");
    const authors = response.data;
    dispatch({
      type: FETCH_AUTHORS,
      payload: authors
    })
  }
};
