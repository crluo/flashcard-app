import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api";

const INITIAL_FORM_DATA = {
    name: "",
    description: ""
};

function DeckCreate() {
    const history = useHistory();
    const [formData, setFormData] = useState({
        ...INITIAL_FORM_DATA
    });

    function handleDeckSubmit(event) {
        event.preventDefault();
        const abortController = new AbortController();
        async function addDeck() {
            const newDeck = await createDeck(formData, abortController.signal);
            setFormData({...INITIAL_FORM_DATA});
            history.push(`/decks/${newDeck.id}`);
        }
        addDeck();
    };

    function handleDeckInputChange(event) {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    function handleCancel() {
        history.push("/");
    };

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home mr-2"></span>Home</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
                </ol>
            </nav>
            <form onSubmit={handleDeckSubmit}>
                <h2>Create Deck</h2>
                <div className="form-group">
                    <label htmlFor="deck-name">Name</label>
                    <input value={formData.name} onChange={handleDeckInputChange} className="form-control" type="text" name="name" id="deck-name" aria-describedby="name" placeholder={"Deck Name"}/>
                </div>
                <div className="form-group">
                    <label htmlFor="deck-description">Description</label>
                    <textarea value={formData.description} onChange={handleDeckInputChange} className="form-control" type="textarea" name="description" id="deck-description" placeholder={"Brief description of the deck"}></textarea>
                </div>
                <button type="button" className="btn btn-secondary mr-3" onClick={handleCancel}>Cancel</button> 
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

export default DeckCreate;