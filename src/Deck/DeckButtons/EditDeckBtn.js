import React from "react";
import { Link } from "react-router-dom";

export default function EditDeckBtn({deckId}) {
    return (
        <Link to={`/decks/${deckId}/edit`}>
          <button type="button" className="btn btn-secondary mr-2">
            <span className="oi oi-pencil mr-2"></span>
            Edit
          </button>
        </Link>
      );
}