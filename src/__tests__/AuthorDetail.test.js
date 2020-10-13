// Does NOT make a request

// Combines data from both states

import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import wait from "waait";

// Component
import AuthorDetail from "../AuthorDetail";

//Mocks
import mockAxios from "axios";
import { fakeAuthor, fakeBook } from "../testUtils";
const mockStore = configureStore([]);

const targetAuthor = fakeAuthor({
  first_name: "floof",
  last_name: "flooferson"
});

const authorsBooks = Array.from(
  { length: Math.floor(Math.random() * 10) },
  () =>
    fakeBook({ authors: [{ id: targetAuthor.id, name: "floof flooferson" }] })
);

targetAuthor.books = authorsBooks.map(book => book.id);

const authors = Array.from(
  { length: Math.floor(Math.random() * 10) },
  fakeAuthor
).concat(targetAuthor);

const books = Array.from(
  { length: Math.floor(Math.random() * 10) },
  fakeBook
).concat(authorsBooks);

describe("<AuthorDetail />", () => {
  let store = mockStore({
    authorsState: { authors },
    booksState: { books }
  });

  const history = createMemoryHistory();

  const wrapper = mount(
    <Router history={history}>
      <Provider store={store}>
        <AuthorDetail match={{ params: { authorID: targetAuthor.id } }} />
      </Provider>
    </Router>
  );
  it("does NOT make any axios requests", async () => {
    await wait();
    wrapper.update;
    expect(mockAxios.get).not.toHaveBeenCalled();
  });

  it("shows the correct author from the redux store", async () => {
    expect(wrapper.text()).toContain(targetAuthor.first_name);
    expect(wrapper.text()).toContain(targetAuthor.last_name);
  });

  it("shows the correct authors books from the redux store", async () => {
    expect(wrapper.find("BookRow").length).toBe(authorsBooks.length);
  });
});
