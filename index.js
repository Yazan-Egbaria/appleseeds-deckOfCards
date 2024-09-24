const golfCardGame = {
  userOne: "",
  userTwo: "",
  userOneHand: [],
  userTwoHand: [],
  deck: [],
  discardPile: [],
  currentPlayer: this.userOne,
  isFaceUp: false,
  isGameOver: false,

  createDeck() {
    const values = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K",
    ];
    const suits = ["h", "d", "c", "s"];

    for (let value of values) {
      for (let suit of suits) {
        this.deck.push(`${value}${suit}`);
      }
    }
  },

  shuffleDeck() {
    for (let i = 0; i < 5000; i++) {
      let indexOne = Math.floor(Math.random() * this.deck.length);
      let indexTwo = Math.floor(Math.random() * this.deck.length);
      [this.deck[indexOne], this.deck[indexTwo]] = [
        this.deck[indexTwo],
        this.deck[indexOne],
      ];
    }
  },

  dealCards() {
    this.userOneHand = this.deck.splice(0, 4);
    this.userTwoHand = this.deck.splice(0, 4);
  },

  discardPileCards() {
    this.discardPile.push(this.deck.pop());
  },

  startGame() {
    this.createDeck();
    this.shuffleDeck();
    this.dealCards();
    this.discardPileCards();
  },
};
