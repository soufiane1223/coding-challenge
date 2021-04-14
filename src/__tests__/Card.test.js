import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";

import Card from "../component/Card";

afterEach(cleanup);

const mockData = {
  name: "bulbasaur",
  url: "https://pokeapi.co/api/v2/pokemon/1/",
};

test("Should render pokemons card", () => {
  render(<Card pokemon={mockData} />);

  const pokemonImage = screen.getByAltText("mainPokemonImage");
  expect(pokemonImage.src).toEqual(
    `https://img.pokemondb.net/artwork/large/${mockData.name}.jpg`
  );

  const pokemonName = screen.getByTestId("cardItem-pokemonName");
  expect(pokemonName).toHaveTextContent(
    mockData.name[0].toUpperCase() + mockData.name.slice(1)
  );
});

test("Should show modal with detail", async () => {
  axios.get.mockResolvedValueOnce({
    data: {
      order: "12",
      weight: "122",
      height: "120",
      base_experience: "12",
    },
  });

  render(<Card pokemon={mockData} />);

  const cardItem = screen.getByTestId("cardItem");

  fireEvent.click(cardItem);

  const pokemonOrder = await screen.findByTestId("modal-pokemonOrder");
  const pokemonWeight = await screen.findByTestId("modal-pokemonWeight");
  const pokemonHeight = await screen.findByTestId("modal-pokemonHeight");
  const pokemonExperience = await screen.findByTestId(
    "modal-pokemonExperience"
  );

  expect(pokemonOrder).toHaveTextContent("order:12");
  expect(pokemonWeight).toHaveTextContent("weight:122");
  expect(pokemonHeight).toHaveTextContent("height:120");
  expect(pokemonExperience).toHaveTextContent("base_experience: 12");
});

test("Should show error message on modal on error", async () => {
  axios.get.mockReturnValue(Promise.reject({}));

  render(<Card pokemon={mockData} />);

  const cardItem = screen.getByTestId("cardItem");

  fireEvent.click(cardItem);

  const errorMessage = await screen.findByTestId("modal-onError");

  expect(errorMessage).toHaveTextContent("Error while loading data");
});
