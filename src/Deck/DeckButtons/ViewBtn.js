import React from "react"
import { Link } from "react-router-dom"

function ViewBtn({deckId}) {
    
    return (
      <Link to={`decks/${deckId}`}>
        <button type="button" className="btn btn-secondary mr-2">
          <span className="oi oi-eye mr-2"></span>
          View
        </button>
      </Link>
    );
}

export default ViewBtn;