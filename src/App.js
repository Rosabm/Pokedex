import "./App.css";
import { useState } from "react";

function App() {
  const [page, setPage] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(1);

  function handleClick(i) {
    console.log("click " + i);
    setSelectedId(i);
    setIsVisible(true);
  }
  function closeInfo() {
    setIsVisible(false);
  }

  function goBack() {
    console.log("back");
    setPage(page - 1);
  }

  function goNext() {
    console.log("Next");
    setPage(page + 1);
  }

  return (
    <>
      <div>
        {" "}
        {isVisible ? (
          <>
            <PokemonInfo pkmId={selectedId} onClose={closeInfo} />
          </>
        ) : (
          ""
        )}
      </div>
      <div>
        <div className="row">
          <PokemonBox
            pkmId={(page - 1) * 12 + 1}
            onPkmClick={() => handleClick((page - 1) * 12 + 1)}
          />
          <PokemonBox
            pkmId={(page - 1) * 12 + 2}
            onPkmClick={() => handleClick((page - 1) * 12 + 2)}
          />
          <PokemonBox
            pkmId={(page - 1) * 12 + 3}
            onPkmClick={() => handleClick((page - 1) * 12 + 3)}
          />
          <PokemonBox
            pkmId={(page - 1) * 12 + 4}
            onPkmClick={() => handleClick((page - 1) * 12 + 4)}
          />
        </div>
        <div className="row">
          <PokemonBox
            pkmId={(page - 1) * 12 + 5}
            onPkmClick={() => handleClick((page - 1) * 12 + 5)}
          />
          <PokemonBox
            pkmId={(page - 1) * 12 + 6}
            onPkmClick={() => handleClick((page - 1) * 12 + 6)}
          />
          <PokemonBox
            pkmId={(page - 1) * 12 + 7}
            onPkmClick={() => handleClick((page - 1) * 12 + 7)}
          />
          <PokemonBox
            pkmId={(page - 1) * 12 + 8}
            onPkmClick={() => handleClick((page - 1) * 12 + 8)}
          />
        </div>
        <div className="row">
          <PokemonBox
            pkmId={(page - 1) * 12 + 9}
            onPkmClick={() => handleClick((page - 1) * 12 + 9)}
          />
          <PokemonBox
            pkmId={(page - 1) * 12 + 10}
            onPkmClick={() => handleClick((page - 1) * 12 + 10)}
          />
          <PokemonBox
            pkmId={(page - 1) * 12 + 11}
            onPkmClick={() => handleClick((page - 1) * 12 + 11)}
          />
          <PokemonBox
            pkmId={(page - 1) * 12 + 12}
            onPkmClick={() => handleClick((page - 1) * 12 + 12)}
          />
        </div>
      </div>
      <div id="pagination">
        {page !== 1 ? <button onClick={goBack}> BACK</button> : ""}

        <label>Page: {page}</label>

        <button onClick={goNext}> NEXT</button>
      </div>
    </>
  );
}

function getPokemon(number) {
  return fetch("https://pokeapi.co/api/v2/pokemon/" + number);
}

function PokemonInfo({ pkmId, onClose }) {
  const [pkm, setPkm] = useState(null);

  getPokemon(pkmId)
    .then((response) => {
      if (!response.ok) throw new Error("Response was not OK!");
      return response.json();
    })
    .then((pkm) => {
      setPkm(pkm);
    });

  if (pkm != null) {
    let primaryType = pkm.types[0].type.name;
    let secondaryType = pkm.types[1]?.type.name;

    return (
      <div id="pokemonInfo">
        <p onClick={onClose} id="X">
          X
        </p>
        <p>
          <b>{"#" + pkmId + "   " + pkm.name}</b>
        </p>
        <div id="pkmImages">
          {" "}
          <img src={pkm.sprites.front_default} />
          <img src={pkm.sprites.back_default} />
        </div>
        <div>
          <div className={"typeBox " + primaryType}>{primaryType}</div>
          {secondaryType != null ? (
            <div className={"typeBox " + secondaryType}>{secondaryType}</div>
          ) : (
            ""
          )}
        </div>

        <p>{pkm.height / 10 + "m  " + pkm.weight / 10 + "kg"}</p>

        <b>Base stats: </b>

        <div className="stats">
          <p>HP: {pkm.stats[0].base_stat}</p>
          <p>Attack: {pkm.stats[1].base_stat}</p>
          <p>Defence: {pkm.stats[2].base_stat}</p>
          <p>Special Attack: {pkm.stats[3].base_stat}</p>
          <p>Special Deffense: {pkm.stats[4].base_stat}</p>
          <p>Speed: {pkm.stats[5].base_stat}</p>
        </div>
      </div>
    );
  } else return "";
}

function PokemonBox({ pkmId, onPkmClick }) {
  const [name, setName] = useState("");
  const [img, setImage] = useState("");
  const [type, setType] = useState("");

  getPokemon(pkmId)
    .then((response) => {
      if (!response.ok) throw new Error("Response was not OK!");
      console.log("Success!");
      return response.json();
    })
    .then((pkm) => {
      setName(pkm.name);
      setImage(pkm.sprites.front_default);
      setType("pkmBox " + pkm.types[0].type.name);
    });
  return (
    <div className={type} onClick={onPkmClick}>
      <img src={img} alt="" />
      <p className="pkmName">{name}</p>
      <p className="pkmId">{"#" + pkmId}</p>
    </div>
  );
}

export default App;
