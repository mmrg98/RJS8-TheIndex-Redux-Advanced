import { SET_BOOKS } from "../../actions/actionTypes";
import reducer from "../books";

import { fakeAuthor } from "../../../testUtils";

describe("books reducer", () => {
  const initialState = {
    books: [],
    loading: true
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_BOOKS actions", () => {
    const books = Array.from(
      { length: Math.floor(Math.random() * 10) },
      fakeAuthor
    );

    const newState = reducer(initialState, {
      type: SET_BOOKS,
      payload: books
    });
    expect(newState.books).toBe(books);
    expect(newState.loading).toBe(false);
  });
});
