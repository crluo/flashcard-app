import React, { useEffect, useState } from "react";
import CardForm from "./CardForm";
import { Link, useParams, useHistory } from "react-router-dom";
import { readDeck, readCard } from "../../utils/api";

export default function EditCard() {
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
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><Link to="/"><span class="oi oi-home mr-2"></span>Home</Link></li>
                    <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                    <li class="breadcrumb-item active" aria-current="page">Edit Card {formData.id}</li>
                </ol>
            </nav>
            <div>
                <h1>Edit Card</h1>
            </div>
            <CardForm formData={formData} setFormData={setFormData} isNew={false} deckId={deckId}/>
        </div>
    );
}