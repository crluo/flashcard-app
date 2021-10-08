import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Header from "./Header";
import Home from "../Home";
import DeckView from "../Deck/View";
import DeckCreate from "../Deck/Create";
import DeckEdit from "../Deck/Edit";
import Study from "../Deck/Study";
import CardCreate from "../Card/Create";
import CardEdit from "../Card/Edit";
import NotFound from "./NotFound";


function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={`/`}>
            <Home />
          </Route>
          <Route path="/decks/new">
            <DeckCreate />
          </Route>
          <Route exact path="/decks/:deckId">
            <DeckView />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <CardCreate />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit />
          </Route>
          <Route exact path="/decks">
            <Redirect to="/" />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
