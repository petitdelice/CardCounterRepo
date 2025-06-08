import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import {
  Button,
  ButtonText,
} from "@/components/ui/button"

import { VStack } from "@/components/ui/vstack";
import { HStack } from "@/components/ui/hstack";
import { Center } from "@/components/ui/center";
import { Box } from "@/components/ui/box";
import { Text } from "@/components/ui/text";

const deck = [
  '1♠️',
  '1♣️',
  '1♦️',
  '1❤️',
  '2♠️',
  '2♣️',
  '2♦️',
  '2❤️',
  '3♠️',
  '3♣️',
  '3♦️',
  '3❤️',
  '4♠️',
  '4♣️',
  '4♦️',
  '4❤️',
  '5♠️',
  '5♣️',
  '5♦️',
  '5❤️',
  '6♠️',
  '6♣️',
  '6♦️',
  '6❤️',
  '7♠️',
  '7♣️',
  '7♦️',
  '7❤️',
  '8♠️',
  '8♣️',
  '8♦️',
  '8❤️',
  '9♠️',
  '9♣️',
  '9♦️',
  '9❤️',
  '10♠️',
  '10♣️',
  '10♦️',
  '10❤️',
  'J♠️',
  'J♣️',
  'J♦️',
  'J❤️',
  'Q♠️',
  'Q♣️',
  'Q♦️',
  'Q❤️',
  'K♠️',
  'K♣️',
  'K♦️',
  'K❤️',
  '♠️',
  '♣️',
  '♦️',
  '❤️',
]

export default function Index() {
  const [counter, setCounter] = useState<number>(0);

  const handleReset = () => {
    setCounter(0);
  }

  const handleNext = () => { 
    setCounter(counter + 1);
  }

  return (
      <SafeAreaView>
        <Center>
          <VStack>
            <Center>
            <Box className="h-[100]"/>
              <Text size="6xl">{counter}</Text>
            </Center>
            <Box className="h-[100]"/>
            <HStack space="lg" className="mx-5">
              <Button action="negative" onPress={handleReset}>
                <ButtonText>Reset</ButtonText>
              </Button>
              <Button onPress={handleNext}>
                <ButtonText>Next</ButtonText>
              </Button>
              <Button>
                <ButtonText>Show Count</ButtonText>
              </Button>
            </HStack>
          </VStack>
        </Center>
      </SafeAreaView>
  );
}
