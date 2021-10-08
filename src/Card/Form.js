import React from "react";
import { useHistory } from "react-router-dom";
import { createCard, updateCard } from "../utils/api";

export default function CardForm({ deckId, formData, setFormData, isNew }) {
    const history = useHistory();

    function handleSubmit(event) {
        event.preventDefault();
        event.stopPropagation();
        if (isNew) {
          createCard(deckId, formData)
            .then(() => history.push(`/decks/${deckId}`))
        } else if (!isNew) {
          updateCard(formData)
            .then(() => history.push(`/decks/${deckId}`))
        }
    }

    function handleInputChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="card-front">Front</label>
          <textarea
            value={formData.front}
            onChange={handleInputChange}
            name="front"
            id="card-front"
            cols="30"
            rows="5"
            className="form-control"
            placeholder={formData.front}
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="card-back">Back</label>
          <textarea
            value={formData.back}
            onChange={handleInputChange}
            name="back"
            id="card-back"
            cols="30"
            rows="5"
            className="form-control"
            placeholder={formData.back}
          ></textarea>
        </div>
        <button type="button" className="btn btn-secondary mr-2" onClick={() => history.push(`/decks/${deckId}`)}>{ isNew ? "Done" : "Cancel" }</button>
        <button type="submit" className="btn btn-primary">{ isNew ? "Save" : "Submit" }</button>
      </form>
    );
}