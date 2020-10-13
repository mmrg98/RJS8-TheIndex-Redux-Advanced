// Test source of books is redux

import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

// Component
import BookList from "../BookList";

//Mocks
import { fakeBook } from "../testUtils";
const history = createMemoryHistory();
const mockStore = configureStore([]);
const books = Array.from({ length: Math.floor(Math.random() * 10) }, fakeBook);
const store = mockStore({
  booksState: { books }
});
const wrapper = mount(
  <Router history={history}>
    <Provider store={store}>
      <BookList match={{ params: {} }} />
    </Provider>
  </Router>
);

describe("<BookList />", () => {
  it("gets the book list from the store", async () => {
    expect(wrapper.find("BookRow").length).toBe(books.length);
  });
});
