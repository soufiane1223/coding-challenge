import React, { useEffect, useRef, useState } from "react";
import CardList from "./component/CardList";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";
import { Center, Container } from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/react";


const App = () => {
  const [pokemons, setpokemons] = useState([]);
  const [url, seturl] = useState("https://pokeapi.co/api/v2/pokemon?limit=10");

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };
  const prevPokemons = usePrevious(pokemons);

  const loadPokemon = () => {
    axios
      .get(url)
      .then((res) => {
        seturl(res.data.next);
        setpokemons([...prevPokemons, ...res.data.results]);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };
  return (
    <Container id="container" maxW="container.xl" >
      {pokemons ? (
        <InfiniteScroll
          pageStart={0}
          loadMore={loadPokemon}
          hasMore={url}
          loader={
          <Center> <Spinner className="spinner" size="xl" /></Center> 
          }
        >
          <CardList pokemons={pokemons} />
        </InfiniteScroll>
      ) : (
        <Center> <Spinner size="xl" /></Center> 
        )}
    </Container>
  );
};

export default App;
