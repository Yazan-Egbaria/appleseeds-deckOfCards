# appleseeds-deckOfCards

## Game Steps:

1- Init Game:
create a deck of cards, shuffle the cards, and deal cards for each player, then create a discard pile, start the game

2- Player Turn:
a random player will be selected to start the game

3- Question 1:
the random player will be asked wether to draw from the card, or from the discard pile

4- Question 2 - Draw From Card:
if the player drew from the card, he will be asked wether to replace 1 of the cards in his hand, or throw it to the discard pile

5- Question 2 - Draw From Discard Pile:
if the player drew from the discard pile, he will have to replace 1 of the cards in his hand

6- Question 3:
after the player has finished his turn, he will be asked are all of his 4 cards faceup? if yes the game will end, if no the game will switch turns untill a certain player have 4 cards face up

7- Game End:
if game has ended and each player has his 4 cards faceup, will calculate the cards, and the one with the lower score wins

## Game Planning:

### Encapsulation Way:

golfCard object: {
userOne: "",
userTwo: "",
deck: [],
discardPile: [],
userOneHand: [],
userTwoHand: [],
currentPlayer: userOne,
isFaceUp: false;
isGameOver: false,
}

## Game Features

1- Init Game:

- create a deck of cards -V
  create a deck of cards made of 52 cards {value, suite} and push them to the deck array
- shuffle cards -V
- dealCards() -V
  deal 4 cards for each player face down, and pop them out from the main deck
- create a discard pile -V
  at the very beginning pop one card from the main deck and push it to the discard pile
- start game
  everything is ready, time to start the game

2- Player Turn:

- draw from cards
  player will draw 1 card from the cards and will have two options: 1) throw it to the dicard pile 2) replace 1 card in his hand and flip it face up
- draw from pile
  player will draw from the pile and replace 1 card in his hand and flip it face up

3- End Game:

- if one player has all the 4 cards face up, flip all the cards face up
- calculate the score for each player
- the one with the lowest score wins
