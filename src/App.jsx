import React, { useEffect, useState } from "react";
import "./App.css";
import Card from "./Card";

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function App() {
  const [pokemonData, setPokemonData] = useState([]);
  const [clickedPokemon, setClickedPokemon] = useState({});
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const fetchPokemonData = () => {
    const offsetNumber = Math.floor(Math.random() * 1276);

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=6&offset=${offsetNumber}`)
      .then((resp) => resp.json())
      .then((result) => {
        const fetchPromises = result.results.map((pokemon) =>
          fetch(pokemon.url)
            .then((resp) => resp.json())
            .then(({ name, sprites }) => ({
              name,
              sprite: sprites.front_default,
            }))
        );

        Promise.all(fetchPromises).then((data) => {
          setPokemonData(data);
        });
      });
  };

  const handleCardClick = (pokemonName) => {
    if (!clickedPokemon[pokemonName]) {
      setClickedPokemon({ ...clickedPokemon, [pokemonName]: true });
      setScore(score + 1);
      setHighScore(Math.max(highScore, score + 1)); // Update high score
      setPokemonData(shuffleArray(pokemonData));
    } else {
      setClickedPokemon({});
      setScore(0);
      setPokemonData(shuffleArray(pokemonData));
    }
  };

  useEffect(() => {
    fetchPokemonData();
  }, []);

  return (
    <div className="main-container">
      <div className="score-container">
        <div className="score">Score: {score}</div>
        <div className="high-score">High Score: {highScore}</div>
      </div>
      <div className="cards-container">
        {pokemonData?.map((pokemon, index) => (
          <Card
            key={pokemon.name}
            pokemon={pokemon}
            isClicked={clickedPokemon[pokemon.name]}
            onClick={() => handleCardClick(pokemon.name)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
