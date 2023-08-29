import React from "react";
import PropTypes from "prop-types";

function Card({ pokemon, isClicked, onClick }) {
  return (
    <div className={`card ${isClicked ? "clicked" : ""}`} onClick={onClick}>
      <p>{pokemon.name}</p>
      <img src={pokemon.sprite} alt={`${pokemon.name} sprite`} />
    </div>
  );
}

Card.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    sprite: PropTypes.string.isRequired,
  }).isRequired,
  isClicked: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default Card;
