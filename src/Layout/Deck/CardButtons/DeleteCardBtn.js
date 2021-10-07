import React from "react";
import { deleteCard } from "../../../utils/api";

export default function DeleteCardBtn( {refreshCards, deckId, cardId } ) {
    async function handleDelete() {
        const abortController = new AbortController();
        let confirmation = window.confirm("Delete this card? You will not be able to recover it.");
        if (confirmation) {
            await deleteCard(cardId, abortController.signal);
            refreshCards(deckId);
        }
    }
    return (
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
            <span class="oi oi-trash"></span>
        </button>
    )
    
}