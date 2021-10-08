import React, { useEffect, useState } from "react"
import CreateDeckBtn from "./DeckButtons/CreateDeckBtn"
import ViewBtn from "./DeckButtons/ViewBtn"
import StudyBtn from "./DeckButtons/StudyBtn"
import DeleteDeckBtn from "./DeckButtons/DeleteDeckBtn"
import { listDecks, deleteDeck } from "../utils/api"

/**
 * 
 * Displays all decks
 */

function DeckList() {
    const [ decks, setDecks ] = useState([]);
    
    useEffect(loadDecks, []);

    function loadDecks() {
        listDecks().then(setDecks);
    }

    function handleDelete(deckId) {
        let confirmation = window.confirm("Delete this deck? You will not be able to recover it.");
        if (confirmation) {
            deleteDeck(deckId).then(loadDecks);
        }
    }

    const list = decks.map((deck) => (
        <div className="card" key={deck.id}>
            <div className="card-body">
                <h5 className="card-title">{deck.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{deck.cards.length} cards</h6>
                <p className="card-text">{deck.description}</p>
                <ViewBtn deckId={deck.id}/>
                <StudyBtn deckId={deck.id}/>
                <DeleteDeckBtn handleDelete={() => handleDelete(deck.id)}/>
            </div>
        </div>
    ));

    return (
        <div>
            <CreateDeckBtn />
            <div>{list}</div>
        </div>
    )
}

export default DeckList;