import React from "react"

function DeleteDeckBtn({handleDelete}) {
    return (
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
            <span className="oi oi-trash"></span>
        </button>
    )
}

export default DeleteDeckBtn;