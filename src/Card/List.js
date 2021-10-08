import React from "react";
import DeleteCardBtn from "./CardButtons/DeleteCardBtn";
import EditCardBtn from "./CardButtons/EditCardBtn";

function CardList({ deck, loadCards }) {
    const { cards = [] } = deck;

    return cards.map((card) => {
        return (
          <div className="card" key={card.id}>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <p className="card-text">
                    {card.front}
                  </p>
                </div>
                <div className="col">
                  <p className="card-text">
                    {card.back}
                  </p>
                </div>
              </div>
              <div className="d-flex flex-row-reverse">
                <DeleteCardBtn loadCards={loadCards} deckId={deck.id} cardId={card.id}/>
                <EditCardBtn deckId={deck.id} cardId={card.id}/>
              </div>
            </div>
          </div>
        );
    });
}

export default CardList;