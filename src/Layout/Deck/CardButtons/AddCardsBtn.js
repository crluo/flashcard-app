import React from "react";
import { Link } from "react-router-dom"

export default function AddCardsBtn({deckId}) {
    return (
        <Link to={`/decks/${deckId}/cards/new`}>
          <button type="button" class="btn btn-primary mr-2">
            <span className="oi oi-plus mr-2"></span>
            Add Cards
          </button>
        </Link>
    )
}