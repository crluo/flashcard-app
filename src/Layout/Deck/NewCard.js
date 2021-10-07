import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../../utils/api";
import CardForm from "./CardForm";

export default function NewCard() {
    const { deckId } = useParams();
    const [ deck, setDeck ] = useState({});
    const [ formData, setFormData ] = useState([{
        front: "",
        back: "",
    }]);

    useEffect(() => {
        const abortController = new AbortController();
        async function fetchDeck() {
            const currentDeck = await readDeck(deckId, abortController.signal);
            setDeck(currentDeck);
        };
        fetchDeck();
    }, [deckId]);

    return (
        <div>
            <div>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><Link to="/"><span class="oi oi-home mr-2"></span>Home</Link></li>
                        <li class="breadcrumb-item"><Link to={`/decks/${deckId}`}>Deck {deck.name}</Link></li>
                        <li class="breadcrumb-item active" aria-current="page">Add Card</li>
                    </ol>
                </nav>
                <h1>{deck.name}: Add Card</h1>
            </div>
            <CardForm formData={formData} setFormData={setFormData} isNew={true} deckId={deckId}/>
        </div>
    )
}