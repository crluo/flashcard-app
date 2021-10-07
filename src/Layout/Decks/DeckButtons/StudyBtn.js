import React from "react"
import { Link } from "react-router-dom"

function StudyBtn( {deckId} ) {
    return (
      <Link to={`/decks/${deckId}/study`}>
        <button type="button" class="btn btn-primary mr-2">
          <span class="oi oi-book mr-2"></span>
          Study
        </button>
      </Link>
    );
}

export default StudyBtn;