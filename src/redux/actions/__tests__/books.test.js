import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// Action types
import { SET_BOOKS } from "../actionTypes";

// Actions
import { fetchBooks } from "../books";

//Mocks
import mockAxios from "axios";
import { fakeBook } from "../../../testUtils";

const mockStore = configureStore([thunk]);

describe("`fetchBooks`", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    mockAxios.get.mockClear();
  });

  it("makes a request to the correct url", async () => {
    await store.dispatch(fetchBooks());
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith("/api/books/");
  });

  it("returns the correct action", async () => {
    const books = Array.from(
      { length: Math.floor(Math.random() * 10) },
      fakeBook
    );
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: books })
    );
    const expectedActions = [{ type: SET_BOOKS, payload: books }];
    await store.dispatch(fetchBooks());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
