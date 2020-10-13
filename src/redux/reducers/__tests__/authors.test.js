import { SET_AUTHORS } from "../../actions/actionTypes";
import reducer from "../authors";

import { fakeAuthor } from "../../../testUtils";

describe("authors reducer", () => {
  const initialState = {
    authors: [],
    loading: true
  };

  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_AUTHORS actions", () => {
    const authors = Array.from(
      { length: Math.floor(Math.random() * 10) },
      fakeAuthor
    );

    const newState = reducer(initialState, {
      type: SET_AUTHORS,
      payload: authors
    });
    expect(newState.authors).toBe(authors);
    expect(newState.loading).toBe(false);
  });
});
