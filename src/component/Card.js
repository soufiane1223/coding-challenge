import React, { useState } from "react";
import axios from "axios";

import {
  Box,
  Grid,
  Image,
  Button,
  Center,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";

import { StyledBox } from "./Card.styled";

import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";

const Card = ({ pokemon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detail, setDetail] = useState([]);
  const [error, setError] = useState(false);

  const handelModel = () => {
    axios
      .get(pokemon.url)
      .then((res) => {
        setDetail(res.data);
      })
      .catch(function (error) {
        // handle error
        setError(true);
        console.log(error);
      })
      .finally(() => onOpen());
  };

  return (
    <>
      <StyledBox
        onClick={handelModel}
        id="card"
        background="white"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        data-testid="cardItem"
      >
        <Center data-testid="cardItem-pokemonImg">
          <Image
            boxSize="150px"
            objectFit="contain"
            src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
            alt="mainPokemonImage"
            ignoreFallback={true}
          />
        </Center>
        <Box
          textAlign="center"
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
          data-testid="cardItem-pokemonName"
        >
          {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
        </Box>
      </StyledBox>
      <Modal
        size="xl"
        id="modal"
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{pokemon.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {!error ? (
              <Grid
                h="200px"
                templateRows="repeat(2, 1fr)"
                templateColumns="repeat(5, 1fr)"
                gap={4}
              >
                <GridItem rowSpan={2} colSpan={1}>
                  <Image
                    boxSize="150px"
                    objectFit="contain"
                    src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
                    alt="detailPokemonImage"
                  />
                </GridItem>
                <GridItem colSpan={2}>
                  <Box
                    textAlign="center"
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    data-testid="modal-pokemonOrder"
                  >
                    order:{detail.order}
                  </Box>
                </GridItem>
                <GridItem colSpan={2}>
                  <Box
                    textAlign="center"
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    data-testid="modal-pokemonWeight"
                  >
                    weight:{detail.weight}
                  </Box>
                  <Box
                    textAlign="center"
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    data-testid="modal-pokemonHeight"
                  >
                    height:{detail.height}
                  </Box>
                </GridItem>

                <GridItem colSpan={4}>
                  <Box
                    textAlign="center"
                    mt="1"
                    fontWeight="semibold"
                    as="h4"
                    data-testid="modal-pokemonExperience"
                  >
                    base_experience: {detail.base_experience}
                  </Box>
                </GridItem>
              </Grid>
            ) : (
              <Box
                textAlign="center"
                mt="1"
                fontWeight="semibold"
                as="h4"
                color="red"
                data-testid="modal-onError"
              >
                Error while loading data
              </Box>
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Card;
