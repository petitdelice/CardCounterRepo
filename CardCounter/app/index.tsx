import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useMemo, useState } from "react";

import {
  Button,
  ButtonText,
} from "@/components/ui/button"

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";
import { useNavigation } from "@react-navigation/native";
import { Banque } from "@/components/objects/deck";


const CountText = (counter: number, isVisible: boolean) => {
  if (isVisible) {
    return (
      <Center>
        <Text size="6xl">{counter}</Text>
      </Center>    );
  } else {
    return null;
  }
}

const CounterPart = (
                    handleReset: () => void,
                    handleNext: () => void,
                    handleShow: () => void,
                    banque: Banque,
                    deckIndex: number,
                    cardIndex: number,
                    isVisible: boolean,
                    counter: number) => {
  return (
    <VStack>
      <Center>
        <Text size="6xl">{banque.conteneur[deckIndex].deck[cardIndex]}</Text>
      </Center>
      <Box className="h-[50]"/>
      <HStack
        space="lg"
        className="mx-5 w-full"
      >
        <Button
          action="negative"
          onPress={handleReset}
          className="h-[75]"
        >
          <ButtonText>Reset</ButtonText>
        </Button >
        <Button
          onPress={handleShow}
          className="h-[75]"
        >
          <ButtonText>Show Count</ButtonText>
        </Button>
        <Button
          onPress={handleNext}
          className="h-[75]"
        >
          <ButtonText>Next</ButtonText>
        </Button>
      </HStack>
      <Box className="h-[50]"/>
      {
        CountText(counter, isVisible)
      }
    </VStack>
  );
}

const DeckSettings = (
                      handleAddDeck: () => void,
                      handleSubDeck: () => void,
                      handleResetDeck: () => void,
                      deckNb: number
) => {
  return (
    <VStack>
      <Box className="h-[100]"/>
      <Center>
        <Text size="6xl">{deckNb}</Text>
      </Center>
      <Box className="h-[50]"/>
      <HStack
        space="lg"
        className="mx-5 w-full"
      >
        <Button
          action="positive"
          onPress={handleAddDeck}
          className="h-[75]"
        >
          <ButtonText>Deck +1</ButtonText>
        </Button>
        <Button
          action="negative"
          onPress={handleSubDeck}
          className="h-[75]"
        >
          <ButtonText>Deck -1</ButtonText>
        </Button>
        <Button
          onPress={handleResetDeck}
          className="h-[75]"
        >
          <ButtonText>Reset</ButtonText>
        </Button>
      </HStack>
    </VStack>
  );
}

const EndCount = (cardIndex: number, deckIndex: number, banque: Banque) => {
  const deck_maxi = banque.conteneur.length - 1;  
  
  if (cardIndex === 51 && deckIndex === deck_maxi) {
    return (
      <Center>
        <Box className="h-[75]"/>
        <Text size="6xl">Fini</Text>
      </Center>
    );
  } else {
    return <Box className="h-[75]"/>;
  }
}


const Index = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);


  const [deckNb, setDeckNb] = useState<number>(1);
  const [banque, setBanque] = useState<Banque>(new Banque(1));
  const [deckIndex, setDeckIndex] = useState<number>(0);
  const [cardIndex, setCardIndex] = useState<number>(0);
  const [countVisible, setCountVisible] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(0);

  useEffect(() => {
    banque.shuffle();
    setBanque(banque);
  }, []);

  const handleResetCount = () => {
    let bq = new Banque(deckNb);
    bq.shuffle();

    setBanque(bq)
    setDeckIndex(0);
    setCardIndex(0);
    setCounter(0);
  }

  const handleNextCount = () => {
    const cardStr = banque.conteneur[deckIndex].deck[cardIndex]
    let cardNb = parseInt(cardStr[0]);
    if (!cardNb) {
      if (cardStr[0] === "J") {
        cardNb = 11;
      } else if (cardStr[0] === "Q") {
        cardNb = 12;
      } else if (cardStr[0] === "K") {
        cardNb = 13;
      } else {  
        cardNb = 14;
      }
    } else {
      // la bidouille
      if (cardNb === 1) {
        if (cardStr[1] === "0") {
          cardNb = 10;
        }
      }
    }
    
    if (cardNb < 8) {
      setCounter(counter + 1);
    } else if (cardNb > 9) {
      setCounter(counter - 1);
    }
    
    setDeckIndex((cardIndex % banque.conteneur.length));
    setCardIndex((cardIndex + 1) % 52);
  }

  const handleShowCount = () => {   
    setCountVisible(!countVisible);
  }

  const handleAddDeck = () => {
      const newNb = deckNb + 1;

      let bq = new Banque(deckNb);
      bq.shuffle();

      setBanque(bq)
      setDeckIndex(0);
      setCardIndex(0);
      setCounter(0);

      setDeckNb(newNb);
  }

  const handleSubDeck = () => {
    if (deckNb > 1) {
      const newNb = deckNb - 1;

      let bq = new Banque(deckNb);
      bq.shuffle();

      setBanque(bq)
      setDeckIndex(0);
      setCardIndex(0);
      setCounter(0);


      setDeckNb(newNb);
    }
  }
  const handleResetDeck = () => {
    setDeckNb(1);

    let bq = new Banque(deckNb);
    bq.shuffle();

    setBanque(bq)
    setDeckIndex(0);
    setCardIndex(0);
    setCounter(0);
  }


  const counterPart = useMemo(() => CounterPart(
                                      handleResetCount,
                                      handleNextCount,
                                      handleShowCount,
                                      banque,
                                      deckIndex,
                                      cardIndex,
                                      countVisible,
                                      counter),
                                      [countVisible, cardIndex, banque]);
  const deckSettings = useMemo(() => DeckSettings(
                                      handleAddDeck,
                                      handleSubDeck,
                                      handleResetDeck,
                                      deckNb), [deckNb]);
  const endCount = useMemo(() => EndCount(cardIndex, deckIndex, banque), [cardIndex]);

  return (
      <SafeAreaView>
        <Center>
          <VStack space="lg">
            {
              deckSettings
            }
            {
              endCount
            }
            {
              counterPart
            }
          </VStack>
        </Center>
      </SafeAreaView>
  );
}


export default Index;
