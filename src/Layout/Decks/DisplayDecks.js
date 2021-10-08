import React, { useEffect, useState } from "react"
import ViewBtn from "./DeckButtons/ViewBtn"
import StudyBtn from "./DeckButtons/StudyBtn"
import DeleteDeckBtn from "./DeckButtons/DeleteDeckBtn"
import { listDecks } from "../../utils/api"

/**
 * 
 * Displays all decks
 */

export default function DisplayDecks() {
    const [ decks, setDecks ] = useState([]);

    useEffect(() => {
        const abortController = new AbortController();
        
        async function fetchDecks() {
            const decks = await listDecks(abortController.signal);
            setDecks(decks);
        }
        fetchDecks();
    }, []);

    function refreshDecks() {
        listDecks().then(setDecks);
    }

    return decks.map((deck) => {
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{deck.name}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{deck.cards.length} cards</h6>
                        <p className="card-text">{deck.description}</p>
                        <ViewBtn deckId={deck.id}/>
                        <StudyBtn deckId={deck.id}/>
                        <DeleteDeckBtn refreshDecks={refreshDecks} deckId={deck.id}/>
                    </div>
                </div>
            </div>
        );
    });
}