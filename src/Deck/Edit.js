import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function DeckEdit() {
    const { deckId } = useParams();
    const history = useHistory();
    const [deck, setDeck] = useState({});

    const initialFormData = {
        name: "",
        description: ""
    }

    const [formData, setFormData] = useState({...initialFormData});

    useEffect(() => {
        const abortController = new AbortController();
        async function fetchDeck() {
            const currentDeck = await readDeck(deckId, abortController.signal);
            setDeck(currentDeck);
            setFormData(currentDeck);
        }
        fetchDeck();
    }, [deckId])

    function handleInputChange({ target }) {
        setFormData( {
            ...formData,
            [target.name]: target.value
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        updateDeck(formData).then(() => history.push(`/decks/${deckId}`));
    }

    function handleCancel() {
        history.push("/");
    }

    return (
      <div>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home mr-2"></span>Home</Link></li>
                <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
        </nav>
        <form onSubmit={handleSubmit}>
          <h2>Edit Deck</h2>
          <div className="form-group">
            <label htmlFor="deck-name">Name</label>
            <input
              value={formData.name}
              onChange={handleInputChange}
              className="form-control"
              type="text"
              name="name"
              id="deck-name"
              aria-describedby="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="deck-description">Description</label>
            <textarea
              value={formData.description}
              onChange={handleInputChange}
              className="form-control"
              type="textarea"
              name="description"
              id="deck-description"
            ></textarea>
          </div>
          <button
            type="button"
            className="btn btn-secondary mr-3"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
}

export default DeckEdit;