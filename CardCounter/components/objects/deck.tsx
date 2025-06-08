const truc: string[] = [
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

class Deck {
    deck: string[];

    constructor() {
        this.deck = [
        '2♠️','2♣️','2♦️','2❤️','3♠️','3♣️','3♦️','3❤️','4♠️','4♣️','4♦️','4❤️',
        '5♠️','5♣️','5♦️','5❤️','6♠️','6♣️','6♦️','6❤️','7♠️','7♣️','7♦️','7❤️','8♠️','8♣️','8♦️','8❤️',
        '9♠️','9♣️','9♦️','9❤️','10♠️','10♣️','10♦️','10❤️','J♠️','J♣️','J♦️','J❤️','Q♠️','Q♣️','Q♦️','Q❤️',
        'K♠️','K♣️','K♦️','K❤️','♠️','♣️','♦️','❤️',]
    }
}

class Banque {
    conteneur: Deck[]
    nb_c: number;

    constructor(nb_c: number) {
        this.nb_c = nb_c;
        this.conteneur = [];
        for (let i = 0; i < nb_c; i++) {
            this.conteneur.push(new Deck());
        }
    }

    reset = () => {
        this.conteneur = [];
        for (let i = 0; i < this.nb_c; i++) {
            this.conteneur.push(new Deck());
        }
    }

    shuffle = () => {
        // Fisher-Yates shuffle for each deck

        for (let i = 0; i < this.conteneur.length; i++) {
            let currentIndex = this.conteneur[i].deck.length;

            // While there remain elements to shuffle...
            while (currentIndex != 0) {

                // Pick a remaining element...
                let randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;

                // And swap it with the current element.
                [this.conteneur[i].deck[currentIndex], this.conteneur[i].deck[randomIndex]] = [
                this.conteneur[i].deck[randomIndex], this.conteneur[i].deck[currentIndex]];
            }
        }
    }


}

export {
    Banque, Deck
}
