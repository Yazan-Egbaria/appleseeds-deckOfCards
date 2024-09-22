const readline = require("node:readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const golfCardGame = {
  userOne: "",
  userTwo: "",
  userOneHand: [],
  userTwoHand: [],
  deck: [],
  discardPile: [],
  currentPlayer: "",
  isGameOver: false,

  createDeck() {
    const values = [
      "Ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "Jack",
      "Queen",
      "King",
    ];
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

    for (let value of values) {
      for (let suit of suits) {
        this.deck.push({ value, suit });
      }
    }
  },

  shuffleDeck() {
    for (let i = this.deck.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
    }
  },

  dealCards() {
    this.userOneHand = this.deck.splice(0, 4);
    this.userTwoHand = this.deck.splice(0, 4);
  },

  discardPileCards() {
    this.discardPile.push(this.deck.pop());
  },
};
