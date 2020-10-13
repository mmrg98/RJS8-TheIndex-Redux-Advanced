import configureStore from "redux-mock-store";
import thunk from "redux-thunk";

// Action types
import { SET_AUTHORS } from "../actionTypes";

// Actions
import { fetchAuthors } from "../authors";

//Mocks
import mockAxios from "axios";
import { fakeAuthor } from "../../../testUtils";

const mockStore = configureStore([thunk]);

describe("`fetchAuthors`", () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  afterEach(() => {
    mockAxios.get.mockClear();
  });

  it("makes a request to the correct url", async () => {
    await store.dispatch(fetchAuthors());
    expect(mockAxios.get).toHaveBeenCalledTimes(1);
    expect(mockAxios.get).toHaveBeenCalledWith("/api/authors/");
  });

  it("returns the correct action", async () => {
    const authors = Array.from(
      { length: Math.floor(Math.random() * 10) },
      fakeAuthor
    );
    mockAxios.get.mockImplementationOnce(() =>
      Promise.resolve({ data: authors })
    );
    const expectedActions = [{ type: SET_AUTHORS, payload: authors }];
    await store.dispatch(fetchAuthors());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
