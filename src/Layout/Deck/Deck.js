import React, { useState, useEffect } from "react"
import { readDeck } from "../../utils/api";
import { useParams, Link } from "react-router-dom"
import EditCardBtn from "./CardButtons/EditCardBtn";
import DeleteDeckBtn from "../Decks/DeckButtons/DeleteDeckBtn";
import DeleteCardBtn from "./CardButtons/DeleteCardBtn";
import StudyBtn from "../Decks/DeckButtons/StudyBtn";
import AddCardsBtn from "./CardButtons/AddCardsBtn";
import EditDeckBtn from "../Decks/DeckButtons/EditDeckBtn.js"

function Deck() {

    const [cards, setCards] = useState([]);
    const [deck, setDeck] = useState({});

    const { deckId } = useParams();
    
    useEffect(() => {
      const abortController = new AbortController();
      
      async function fetchCards() {
          const currentDeck = await readDeck(deckId, abortController.signal);
          setDeck(currentDeck);
          setCards(currentDeck.cards);
      }
      
      fetchCards();
    }, [deckId]);

    function refreshCards(deckId) {
      readDeck(deckId).then((deck) => setCards(deck.cards))
    }
    function DisplayCards() {
        return cards.map((card) => {
            return (
              <div class="card">
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                      <p class="card-text">
                        {card.front}
                      </p>
                    </div>
                    <div class="col">
                      <p class="card-text">
                        {card.back}
                      </p>
                    </div>
                  </div>
                  <div class="d-flex flex-row-reverse">
                    <DeleteCardBtn refreshCards={refreshCards} deckId={deck.id} cardId={card.id}/>
                    <EditCardBtn deckId={deck.id} cardId={card.id}/>
                  </div>
                </div>
              </div>
            );
        })
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
              <DeleteDeckBtn deckId={deck.id}/>
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <li class="breadcrumb-item"><Link to="/"><span class="oi oi-home mr-2"></span>Home</Link></li>
            <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
          </ol>
        </nav>
        <DeckInfo />
        <h2>Cards</h2>
        <DisplayCards />
      </div>
    );
}

export default Deck;

