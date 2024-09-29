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
                  if (this.allCardsFaceUp(currentPlayerHand)) {
                    this.endGame();
                    return;
                  }
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
                if (this.allCardsFaceUp(currentPlayerHand)) {
                    this.endGame();
                    return;
                  }
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

  allCardsFaceUp(hand) {
    return hand.every(card => card.faceUp);
  },

  flipAllCards() {
    this.userOneHand.forEach(card => card.faceUp = true);
    this.userTwoHand.forEach(card => card.faceUp = true);
    console.log(`Player 1's hand: ${this.displayHand(this.userOneHand)}`);
    console.log(`Player 2's hand: ${this.displayHand(this.userTwoHand)}`);
  },

  calculatePlayerScore(hand) {
    let score = 0;
    const valueMap = {
      A: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 0, 8: 8, 9: 9, 10: 10,
      J: -1, Q: 12, K: 13
    };
    const cardValues = hand.map(card => card.value.trim().split(' ')[0]);
    const cardValueCount = {};
    cardValues.forEach(value => {
      cardValueCount[value] = (cardValueCount[value] || 0) + 1;
    });
    cardValues.forEach(value => {
      if (cardValueCount[value] === 2 && value !== '7' && value !== 'J') {
        return;
      }
      score += valueMap[value]; 
    });
    return score;
  },

  calculateScores() {
    const playerOneScore = this.calculatePlayerScore(this.userOneHand);
    const playerTwoScore = this.calculatePlayerScore(this.userTwoHand);
    console.log(`Player 1's score: ${playerOneScore}`);
    console.log(`Player 2's score: ${playerTwoScore}`);
    return { playerOneScore, playerTwoScore };
  },

  declareWinner() {
    const { playerOneScore, playerTwoScore } = this.calculateScores();
    if (playerOneScore < playerTwoScore) {
      console.log(`${this.userOne} wins!`);
    } else if (playerTwoScore < playerOneScore) {
      console.log(`${this.userTwo} wins!`);
    } else {
      console.log("It's a tie!");
    }
  },

  endGame() {
    console.log("All cards are face up! Game over.");
    this.flipAllCards();
    this.calculateScores();
    this.declareWinner();
    this.isGameOver = true;
  },
};

golfCardGame.userOne = "Yazan";
golfCardGame.userTwo = "Noor";
golfCardGame.startGame();
golfCardGame.drawFromCards();
