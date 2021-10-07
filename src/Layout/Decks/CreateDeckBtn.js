import React from "react"
import { Link } from "react-router-dom"

function Button() {
    return (
        <Link to="/decks/new">
            <button type="button" className="btn btn-secondary mb-4">
                <span className="oi oi-plus mr-2"></span>
                Create Deck
            </button>
        </Link>
    )
}

function CreateDeckBtn() {
    
    return (
        <Button />
    )
}

export default CreateDeckBtn;