import React, { useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  GridItem,
  Image,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Grid } from "@chakra-ui/react";
import { StyledBox } from "./Card.styled";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
const Card = (props) => {
  const { pokemon } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detail, setdetail] = useState([]);

  const handelModel = () => {
    axios
      .get(pokemon.url)
      .then((res) => {
        setdetail(res.data);
      })
      .catch(function (error) {
        // handle error
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
      >
        <Center>
          <Image
            boxSize="150px"
            objectFit="contain"
            src={`https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`}
            alt="pokemon"
          />
        </Center>
        <Box
          textAlign="center"
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
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
                  alt="pokemon"
                />
              </GridItem>
              <GridItem colSpan={2} >
                <Box textAlign="center" mt="1" fontWeight="semibold" as="h4">
                  order:{detail.order}

                </Box>
              </GridItem>
              <GridItem colSpan={2}  >
              <Box textAlign="center" mt="1" fontWeight="semibold" as="h4">
                  weight:{detail.weight}

                </Box>
                <Box textAlign="center" mt="1" fontWeight="semibold" as="h4">
                height:{detail.height}

                </Box>

              </GridItem>
              
              <GridItem colSpan={4} >
              <Box textAlign="center" mt="1" fontWeight="semibold" as="h4">

              base_experience: {detail.base_experience}
              </Box>

              </GridItem>
            </Grid>
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
