import React from "react"
import { deleteDeck } from "../../../utils/api"

function DeleteDeckBtn({refreshDecks, deckId}) {
    async function handleDelete() {
        const abortController = new AbortController();
        let confirmation = window.confirm("Delete this deck? You will not be able to recover it.");
        if (confirmation) {
            await deleteDeck(deckId, abortController.signal);
            refreshDecks();
        }
    }

    return (
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
            <span class="oi oi-trash"></span>
        </button>
    )
}

export default DeleteDeckBtn;