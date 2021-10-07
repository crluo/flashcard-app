import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import AddCardsBtn from "../Deck/CardButtons/AddCardsBtn";

function Study() {
    const [ deck, setDeck ] = useState({});
    const [ cards, setCards ] = useState([])
    const [ cardIndex, setCardIndex ] = useState(0);
    const [ flip, setFlip ] = useState(false);
    
    const { deckId } = useParams();

    useEffect(() => {
      const abortController = new AbortController();
      
      async function fetchCards() {
          const currentDeck = await readDeck(deckId, abortController.signal);
          setDeck(() => currentDeck);
          setCards(() => currentDeck.cards);
      }
      fetchCards();
    }, [deckId]);

    function Card() {
        // array of card front content
        const cardFronts = cards.map((card) => {
            return card.front;
        });

        // array of card back content
        const cardBacks = cards.map((card) => {
            return card.back;
        })

        function handleFlipClick() {
            setFlip(!flip);
        }

        function handleNextClick() {
            if ( cardIndex < (cards.length-1) ) {
                setFlip(!flip);
                setCardIndex(() => cardIndex + 1)
            } else if ( cardIndex === (cards.length-1) ) {
                if (window.confirm("Restart cards? Click 'cancel to return to the home page.")) {
                    setCardIndex(0)
                } else (
                    window.location.href = "/"
                )
            }
        }

        // displays the front or back of the card depending on whether it is flipped
        if (!flip) {
            return (
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Card {(cardIndex + 1)} of {cards.length}</h5>
                    <p class="card-text">
                      {cardFronts[cardIndex]}
                    </p>
                    
                    <button type="button" class="btn btn-secondary mr-2" onClick={handleFlipClick}>
                      Flip
                    </button>
                  </div>
                </div>
            )
        } else if (flip) {
            return (
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">Card {(cardIndex + 1)} of {cards.length}</h5>
                    <p class="card-text">
                      {cardBacks[cardIndex]}
                    </p>
                    <button type="button" class="btn btn-secondary mr-2" onClick={handleFlipClick}>
                      Flip
                    </button>
                    <button type="button" class="btn btn-primary mr-2" onClick={handleNextClick}>
                      Next
                    </button>
                  </div>
                </div>
            )
        }
    }

    // if a deck has less than 3 cards, user cannot study the deck and is prompted to add more cards
    if (cards.length < 3) {
        return (
            <div>
                <h2>Study: {deck.name}</h2>
                <h3>Not enough cards.</h3>
                <p>You need at least 3 cards to study. There are {cards.length} in this deck.</p>
                <AddCardsBtn deckId={deckId}/>
            </div>
        )
    } else if (cards.length >= 3) {
        return (
          <div>
            <nav aria-label="breadcrumb">
              <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/"><span class="oi oi-home mr-2"></span>Home</Link></li>
                <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Study</li>
              </ol>
            </nav>
            <h2 className="mb-4">Study: {deck.name}</h2>
            <Card />
          </div>
        );
    }
}
export default Study