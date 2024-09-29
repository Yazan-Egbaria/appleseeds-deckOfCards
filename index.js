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
    const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];

    for (let value of values) {
      for (let suit of suits) {
        this.deck.push(` ${value} of ${suit} `);
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
    this.userOneHand = this.deck.splice(0, 4).map(card => ({value:card , faceUp: false}));
    this.userTwoHand = this.deck.splice(0, 4).map(card => ({value:card , faceUp: false}));
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
    this.currentPlayerHand = this.userOneHand;
  },

  displayHand(hand) {
    return hand.map(card => {
      return card.faceUp ? card.value : "Face Down";
    }).join(", ");
  },

  drawFromCards() {
    while (this.isGameOver === false) {
      console.log(`${this.currentPlayer} Turn:`);
      const takeAction = readlineSync.question(`1- Draw from deck || 2- Draw from discard pile `);

      // DRAW FROM DECK SWITCH ACTION
      switch (takeAction) {
        case "1":
          const drawnCardFromDeck = this.deck.pop();
          console.log(`${this.currentPlayer} drew card from the deck: ${drawnCardFromDeck}`);

          const takeActionDrawnCardFromDeck = readlineSync.question(`1- Throw it to the discard pile || 2- Replace card with another card in your hand `);
          switch (takeActionDrawnCardFromDeck) {
            case "1":
              console.log(`${this.currentPlayer} threw the card ${drawnCardFromDeck} to the discard pile`);
              this.discardPile.push(drawnCardFromDeck);
              break;

            case "2":
              const replaceCard = (currentPlayerHand) => {
                const takeActionReplaceCard = readlineSync.question(`Which card do you want to replace? ${this.displayHand(currentPlayerHand)} `);
                const replacedCard = parseInt(takeActionReplaceCard) - 1;
                if (replacedCard >= 0 && replacedCard < currentPlayerHand.length) {
                  if (!currentPlayerHand[replacedCard].faceUp) {
                    currentPlayerHand[replacedCard].faceUp = true;
                  }
                  console.log(`${this.currentPlayer} replaced the card ${drawnCardFromDeck} with ${currentPlayerHand[replacedCard].value}`);
                  currentPlayerHand[replacedCard].value = drawnCardFromDeck;
                } else {
                  console.log("Invalid choice, try again.");
                  replaceCard(currentPlayerHand);
                }
              };
              replaceCard(this.currentPlayerHand);
              break;
            default:
              console.log("Invalid choice, try again.");
          }
          this.currentPlayer = this.currentPlayer === this.userOne ? this.userTwo : this.userOne;
          this.currentPlayerHand = this.currentPlayerHand === this.userOneHand ? this.userTwoHand : this.userOneHand;
          console.log(`Now it's ${this.currentPlayer}'s turn`);
          break;

        // DRAW FROM DISCARD PILE SWITCH ACTION
        case "2":
          if (this.discardPile.length === 0) {
            console.log("There is no cards in discard pile, you will have to draw card from deck");
          } else {
            const drawnCardFromDiscardPile = this.discardPile.pop();
            console.log(`${this.currentPlayer} drew card from discard pile: ${drawnCardFromDiscardPile}`);

            const replaceCard = (currentPlayerHand) => {
              const takeActionReplaceCard = readlineSync.question(`Which card do you want to replace? ${this.displayHand(currentPlayerHand)} `);
              const replacedCard = parseInt(takeActionReplaceCard) - 1;
              if (replacedCard >= 0 && replacedCard < currentPlayerHand.length) {
                if (!currentPlayerHand[replacedCard].faceUp) {
                    currentPlayerHand[replacedCard].faceUp = true;
                }
                console.log(`${this.currentPlayer} replaced the card ${drawnCardFromDiscardPile} with ${currentPlayerHand[replacedCard].value}`);
                currentPlayerHand[replacedCard].value = drawnCardFromDiscardPile;
                } else {
                  console.log("Invalid choice, try again.");
                  replaceCard(currentPlayerHand);
                }
              };
            replaceCard(this.currentPlayerHand);
            }
          this.currentPlayer = this.currentPlayer === this.userOne ? this.userTwo : this.userOne;
          this.currentPlayerHand = this.currentPlayerHand === this.userOneHand ? this.userTwoHand : this.userOneHand;
          console.log(`Now it's ${this.currentPlayer}'s turn`);
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
