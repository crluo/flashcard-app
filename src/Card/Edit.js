import React, { useEffect, useState } from "react";
import CardForm from "./Form";
import { Link, useParams } from "react-router-dom";
import { readDeck, readCard } from "../utils/api";

function CardEdit() {
    const { deckId, cardId } = useParams();
    const [deck, setDeck] = useState({});
    const [formData, setFormData] = useState({});
 
    useEffect(() => {
        const abortController = new AbortController();
        async function fetchDeck() {
            let currentDeck = await readDeck(deckId, abortController.signal);
            setDeck(currentDeck);
        }
        fetchDeck();
    }, [deckId])

    useEffect(() => {
        const abortController = new AbortController();
        async function fetchCard() {
            let currentCard = await readCard(cardId, abortController.signal);
            setFormData(currentCard);
        }
        fetchCard();
    }, [cardId])

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home mr-2"></span>Home</Link></li>
                    <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Edit Card {formData.id}</li>
                </ol>
            </nav>
            <div>
                <h1>Edit Card</h1>
            </div>
            <CardForm formData={formData} setFormData={setFormData} isNew={false} deckId={deckId}/>
        </div>
    );
}

export default CardEdit;