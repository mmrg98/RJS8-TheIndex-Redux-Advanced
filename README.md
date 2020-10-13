#### Introduction

In this task you're given a version of The Index that still relies on internal application state

#### Setup

1. Fork the [repository](https://github.com/JoinCODED/RJS8-TheIndex-Redux-Advanced)
2. Clone it.
3. `cd` into the project directory.
4. Install the required packages for the task.

```shell
$ yarn install
```

5. Run the project

```shell
$ yarn start
```

---

#### Task

#### 1. Explore

1. Take some time to explore the code, take a look at the files and the comments and the code itself.
2. Talk it out. Discuss it with your fellow developers.
3. Ask questions. That's what we're here for - you don't need to use the question form to ask these questions!

#### 2. Setup Redux

1. Make sure you have installed the Redux Dev Tools

2. Create your `redux` folder with the following structure:

```
redux
├── actions
|   ├── actionType.js (a file that holds all of your action types as strings)
|   ├── authors.js (actions related to the authors store)
|   ├── books.js (actions related to the books store)
|   ├── index.js (a file that exports all your action functions from one place)
├── reducers
|   ├── authors.js (the reducer that handles author actions)
|   ├── books.js (the reducer that handles book actions)
|   ├── index.js (a file that combines all the reducers and returns a root reducer)
├── index.js (a file that creates and returns a redux store)
```

3. In `src/index.js` import your store and wrap the `App` in a `Provider`

#### 3. Migrate to Redux

Refactor the entire application to use Redux.

Things to note:

- You should be able to lose _almost_ all internal state **except** in `AuthorList` and `BookList` - they should still keep their filtering functionality as internal state.
- To avoid completely losing your mind, we recommend you build things in the following order:
  1. All states, actions and reducers related to fetching `authors`
  2. All states, actions and reducers related to fetching `books`
  3. Refactor `AuthorDetail` so that it uses the data from _both_ stores. It shouldn't need to make a request any more.
- **If** you choose to `connect` your `App` component, you **have** to wrap it in `withRouter`:

```javascript
import { Switch, Route, Redirect, withRouter } from "react-router-dom"; // Import

...

export default withRouter(connect(mapStateToProps)(App)); // Wrap
```

---

#### Submission

1. Push your code.