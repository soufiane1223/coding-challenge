import { render, screen } from "@testing-library/react";
import CardList from "../component/CardList";

const mockData = [
  {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  },
  {
    name: "ivysaur",
    url: "https://pokeapi.co/api/v2/pokemon/2/",
  },
  {
    name: "venusaur",
    url: "https://pokeapi.co/api/v2/pokemon/3/",
  },
];

test("Should render list of all pokemons", () => {
  render(<CardList pokemons={mockData} />);
  const cardItem = screen.getAllByTestId("cardItem");
  expect(cardItem.length).toEqual(mockData.length);
});
