import React from "react";
import { Switch, Route } from "react-router";
import Header from "./Header";
import DisplayDecks from "./Decks/DisplayDecks";
import Deck from "./Deck/Deck";
import CreateDeck from "./Decks/CreateDeck";
import EditDeck from "./Decks/EditDeck";
import NotFound from "./NotFound";
import CreateDeckBtn from "./Decks/CreateDeckBtn";
import Study from "./Decks/Study";
import EditCard from "./Deck/EditCard";
import NewCard from "./Deck/NewCard";

function Layout() {

  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path={`/`}>
            <CreateDeckBtn />
            <DisplayDecks />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route exact path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route exact path="/decks/:deckId/cards/new">
            <NewCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
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
