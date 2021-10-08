import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import CardForm from "./Form";

function CardCreate() {
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
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item"><Link to="/"><span className="oi oi-home mr-2"></span>Home</Link></li>
                        <li className="breadcrumb-item"><Link to={`/decks/${deckId}`}>{deck.name}</Link></li>
                        <li className="breadcrumb-item active" aria-current="page">Add Card</li>
                    </ol>
                </nav>
                <h1>{deck.name}: Add Card</h1>
            </div>
            <CardForm formData={formData} setFormData={setFormData} isNew={true} deckId={deckId}/>
        </div>
    );
}
export default CardCreate;