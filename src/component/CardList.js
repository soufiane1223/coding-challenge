import { Container, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

const cardList = ({ pokemons }) => {
  return (
    <Container maxW="container.xl">
      <SimpleGrid columns={[1, null, 3]} spacing="40px">
        {pokemons?.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon}></Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default cardList;
