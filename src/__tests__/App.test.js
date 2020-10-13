import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import wait from "waait";

// Component
import App from "../App";

//Mocks
import mockAxios from "axios";
const mockStore = configureStore([]);

describe("<App />", () => {
  let store = mockStore({
    authorsState: { loading: true },
    booksState: { loading: true }
  });

  const history = createMemoryHistory();

  it("does NOT make any axios requests", async () => {
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );
    await wait();
    wrapper.update;
    expect(mockAxios.get).not.toHaveBeenCalled();
  });

  it("shows the loading state if the authors are still loading", () => {
    store = mockStore({
      authorsState: { loading: true },
      booksState: { loading: false }
    });
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );

    expect(wrapper.find("Loading")).toExist();
  });

  it("shows the loading state if the books are still loading", () => {
    store = mockStore({
      authorsState: { loading: false },
      booksState: { loading: true }
    });
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );

    expect(wrapper.find("Loading")).toExist();
  });

  it("shows the loading state if both are still loading", () => {
    store = mockStore({
      authorsState: { loading: true },
      booksState: { loading: true }
    });
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );

    expect(wrapper.find("Loading")).toExist();
  });

  it("doesn't shows the loading state if neither are loading", () => {
    store = mockStore({
      authorsState: { authors: [], loading: false },
      booksState: { loading: false }
    });
    const wrapper = mount(
      <Router history={history}>
        <Provider store={store}>
          <App />
        </Provider>
      </Router>
    );

    expect(wrapper.find("Loading")).not.toExist();
  });
});
