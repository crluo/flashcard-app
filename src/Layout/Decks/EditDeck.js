import React, { useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";

export default function EditDeck() {
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
            setFormData( {
                name: currentDeck.name,
                description: currentDeck.description
            });
        }
        fetchDeck();
    }, [deckId])

    function handleDeckInputChange({ target }) {
        setFormData( {
            ...formData,
            [target.name]: [target.value]
        });
    }

    function handleDeckSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        deck.name = formData.name;
        deck.description = formData.description;
        async function deckUpdate() {
            await updateDeck(deck, abortController.signal);
            setDeck(deck);
        }
        deckUpdate();
        history.push(`/decks/${deckId}`)
    }

    function handleCancel() {
        history.push("/");
    }

    return (
      <div>
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/"><span class="oi oi-home mr-2"></span>Home</Link></li>
                <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                <li class="breadcrumb-item active" aria-current="page">Edit Deck</li>
            </ol>
        </nav>
        <form>
          <h2>Edit Deck</h2>
          <div className="form-group">
            <label htmlFor="deck-name">Name</label>
            <input
              value={formData.name}
              onChange={handleDeckInputChange}
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
              onChange={handleDeckInputChange}
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
            onSubmit={handleDeckSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
}