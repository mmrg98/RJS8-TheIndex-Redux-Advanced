// Test source of authors is redux

import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

// Component
import AuthorsList from "../AuthorsList";

//Mocks
import { fakeAuthor } from "../testUtils";
const history = createMemoryHistory();
const mockStore = configureStore([]);
const authors = Array.from(
  { length: Math.floor(Math.random() * 10) },
  fakeAuthor
);
const store = mockStore({
  authorsState: { authors }
});
const wrapper = mount(
  <Router history={history}>
    <Provider store={store}>
      <AuthorsList />
    </Provider>
  </Router>
);

describe("<AuthorsList />", () => {
  it("gets the author list from the store", async () => {
    expect(wrapper.find("AuthorCard").length).toBe(authors.length);
  });
});
