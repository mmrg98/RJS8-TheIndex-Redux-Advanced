import React, { useState, useEffect } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import BookList from "./BookList";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

const App = () => {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState([]);
  const fetchAllAuthors = async () => {
    const res = await instance.get("/api/authors/");
    return res.data;
  };

  const fetchAllBooks = async () => {
    const res = await instance.get("/api/books/");
    return res.data;
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const authorsData = await fetchAllAuthors();
        const booksData = await fetchAllBooks();

        setAuthors(authorsData);
        setBooks(booksData);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAll();
  }, []);

  const getView = () => {
    if (loading) {
      return <Loading />;
    } else {
      return (
        <Switch>
          <Redirect exact from="/" to="/authors" />
          <Route path="/authors/:authorID" component={AuthorDetail} />
          <Route
            path="/authors/"
            render={props => <AuthorsList {...props} authors={authors} />}
          />
          <Route
            path="/books/:bookColor?"
            render={props => <BookList {...props} books={books} />}
          />
        </Switch>
      );
    }
  };

  return (
    <div id="app" className="container-fluid">
      <div className="row">
        <div className="col-2">
          <Sidebar />
        </div>
        <div className="content col-10">{getView()}</div>
      </div>
    </div>
  );
};

export default App;
