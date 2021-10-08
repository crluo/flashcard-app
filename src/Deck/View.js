import React, { useState, useEffect } from "react"
import { readDeck, deleteDeck } from "../utils/api";
import { useParams, Link, useHistory } from "react-router-dom"
import DeleteDeckBtn from "./DeckButtons/DeleteDeckBtn";
import StudyBtn from "./DeckButtons/StudyBtn";
import AddCardsBtn from "../Card/CardButtons/AddCardsBtn";
import EditDeckBtn from "./DeckButtons/EditDeckBtn.js"
import CardList from "../Card/List";

function DeckView() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});    

    useEffect(loadDeck, [deckId]);

    function loadDeck() {
      readDeck(deckId).then(setDeck);
    }

    function loadCards(deckId) {
      readDeck(deckId).then((deck) => setDeck(deck));
    }

    function handleDelete(deckId) {
      let confirmation = window.confirm("Delete this deck? You will not be able to recover it.");
      if (confirmation) {
          deleteDeck(deckId).then(() => history.push(`/decks`));
      }
  }


    function DeckInfo() {
      return (
        <div className="col">
          <div className="row">
            <h3>{deck.name}</h3>
          </div>
          <div className="row">
            <h5>{deck.description}</h5>
          </div>
          <div className="row mb-5">
            <div>
              <EditDeckBtn deckId={deck.id}/>
              <StudyBtn deckId={deck.id}/>
              <AddCardsBtn deckId={deck.id}/>
            </div>
            <div>
              <DeleteDeckBtn handleDelete={() => handleDelete(deck.id)}/>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home mr-2"></span>Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
          </ol>
        </nav>
        <DeckInfo />
        <h2>Cards</h2>
        <CardList deck={deck} loadCards={loadCards}/>
      </div>
    );
}

export default DeckView;

