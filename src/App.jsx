import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemonData, setPokemonData] = useState([]);

  const handleCardClick = () => {};

  useEffect(() => {
    const offsetNumber = Math.floor(Math.random() * 1276);

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=6&offset=${offsetNumber}`)
      .then((resp) => resp.json())
      .then((result) => {
        // Map through the results and fetch data from each URL
        const fetchPromises = result.results.map((pokemon) =>
          fetch(pokemon.url)
            .then((resp) => resp.json())
            .then(({ name, sprites }) => ({
              name,
              sprite: sprites.front_default,
            }))
        );

        // Resolve all the fetch promises
        Promise.all(fetchPromises).then((data) => {
          setPokemonData(data); // Update the state with fetched data
        });
      });
  }, []);

  return (
    <div className="container">
      {pokemonData.map((pokemon, index) => (
        <div className="card" key={index} onClick={handleCardClick}>
          <p>{pokemon.name}</p>
          <img src={pokemon.sprite} alt={`${pokemon.name} sprite`} />
        </div>
      ))}
    </div>
  );
}

export default App;
