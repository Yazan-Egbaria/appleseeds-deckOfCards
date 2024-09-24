var readlineSync = require("readline-sync");

const golfCardGame = {
  userOne: "",
  userTwo: "",
  userOneHand: [],
  userTwoHand: [],
  deck: [],
  discardPile: [],
  currentPlayer: null,
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

    this.currentPlayer = this.userOne;
  },

  drawFromCards() {
    while (this.isGameOver === false) {
      const takeAction = readlineSync.question(
        `1- Draw from cards deck || 2- Draw from discard pile `
      );
      switch (takeAction) {
        case "1":
          const drawnCardFromDeck = this.deck.pop();
          console.log(
            `${this.currentPlayer} drew card from cards pile: ${drawnCardFromDeck}`
          );
          const takeActionDrawnCardFromDeck = readlineSync.question(
            `1- Throw it the discard pile || 2- Replace card with another card in your hand `
          );
          switch (takeActionDrawnCardFromDeck) {
            case "1":
              console.log(
                `${this.currentPlayer} threw the card ${drawnCardFromDeck} to the discard pile`
              );
              break;
            case "2":
              const takeActionReplaceCard = readlineSync.question(
                `Which card you want to replace? ${this.userOneHand[0]}, ${this.userOneHand[1]}, ${this.userOneHand[2]}, ${this.userOneHand[3]} `
              );
              switch (takeActionReplaceCard) {
                case "1":
                  console.log(
                    `${this.currentPlayer} replaced the card ${drawnCardFromDeck} with ${this.userOneHand[0]}`
                  );
                  this.userOneHand[0] === drawnCardFromDeck;
                  break;
                case "2":
                  console.log(
                    `${this.currentPlayer} replaced the card ${drawnCardFromDeck} with ${this.userOneHand[1]}`
                  );
                  this.userOneHand[1] === drawnCardFromDeck;
                  break;
                case "3":
                  console.log(
                    `${this.currentPlayer} replaced the card ${drawnCardFromDeck} with ${this.userOneHand[2]}`
                  );
                  this.userOneHand[2] === drawnCardFromDeck;

                  break;
                case "4":
                  console.log(
                    `${this.currentPlayer} replaced the card ${drawnCardFromDeck} with ${this.userOneHand[3]}`
                  );
                  this.userOneHand[3] === drawnCardFromDeck;

                  break;

                default:
                  console.log("Invalid choice, try again.");
              }
              break;
            default:
              console.log("Invalid choice, try again.");
          }
          this.currentPlayer =
            this.currentPlayer === this.userOne ? this.userTwo : this.userOne;
          console.log(`Now it's ${this.currentPlayer}'s turn`);
          break;

        case "2":
          if (this.discardPile.length === 0) {
            console.log(
              "There is no cards in discard pile, you will have to draw card from deck"
            );
          } else {
            const drawnCardFromDiscardPile = this.discardPile.pop();
            console.log(
              `${this.currentPlayer} drew card from discard pile: ${drawnCardFromDiscardPile}`
            );
          }
          break;

        default:
          console.log("Invalid choice, try again.");
      }
    }
  },
};

golfCardGame.userOne = "Yazan";
golfCardGame.userTwo = "Noor";
golfCardGame.startGame();
golfCardGame.drawFromCards();
