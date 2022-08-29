import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import MovieForm from "./components/moviesForm.jsx";
import Customers from "./components/customers.jsx";
import Rentals from "./components/rentals.jsx";
import NotFound from "./components/notFound.jsx";
import Register from "./components/register.jsx";
import NavBar from "./components/navBar.jsx";
import LogIn from "./components/logIn.jsx";
import "./app.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/login" component={LogIn} />
            <Route path="/movies/new" component={MovieForm} />
            <Route path="/register" component={Register} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;