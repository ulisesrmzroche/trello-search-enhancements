import React from 'react';

const Card = (props) => {
  return (
    <div className="search-result-card">
      <div className="search-result-card-container js-list-card-container">
        <div className="search-result-card-container-fade"></div>
        <div className="list-card js-member-droppable ui-droppable">
          <div className="list-card-cover js-card-cover">
          </div>
          <div className="list-card-details">
            <div
              className="list-card-labels js-card-labels"
            ></div>
            <a
              className="list-card-title js-card-name"
              dir="auto"
              href={props.card.url}
            >
              {props.card.name}
            </a>
          </div>
        </div>
      </div>
      <div className="search-result-card-details">
        <p className="u-bottom">
          <a href={props.card.url} className="search-result-card-details-name">
            {props.card.name}
          </a>
        </p>
        <p className="u-bottom quiet">
          in
          <strong> {props.card.list.name} </strong>
          on
          <strong> {props.card.board.name} </strong>
        </p>
      </div>
      <a className="search-result-card-hover-target" href={props.card.url} />
    </div>
  );
}

Card.propTypes = {
  card: React.PropTypes.objectOf(React.PropTypes.object).isRequired,
};

export default Card;
