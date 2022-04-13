# COMP6841 assignment
This assignments work can be found here:
https://subcipher.netlify.app/

## What this project was created with

This project was bootstrapped with [Create React App] and a firebase firestore database was integrated into it for extra features. This app was deployed on netlify.

## Objectives

- Decoding Strings
- Encoding Strings
- Disabling invalid character inputs
- Connecting a database (firebase) to create game
- Create game where you can decode others encrypted text
- Be able to reroll the game and chosen text
- Implement mobile responsivness and make UI even prettier

## Challenges
Initially (for decoding in the game) i attempted to just replace the encoded strings every character that matched with a character in input textfields. This ended up not working because it would end up yeilding:
d = e -> e = c
abcde -> abcee -> abccc

Instead it should have really been:
abcde -> abcee -> abcec

To get this done was to store the initally encoded string and each letter has a mapping to all its indexs in the (original encoded) string 

Moreover, another challenge faced whilst making this project was integrating the database. intially i attempted to integrate the realtime database but to not much success. To overcome this challenge i had ended up utilising firestore. This ended up actually being a better choice aswell from what ive researched since there is no use for true realtime data updates and such and also it would scale up cheaper in the theoretical case that this was to scale.

Lastly, a challenge that presented itself was the clearing of input values upon re-rolling in the game mode. this presented to be a bit stubborn and seemed to work but in reality would fill up the text fields with undefined leading to some really weird behaviour. To overcome this challenge each input field was reset manually (through state to be technical)

## Reflection
Overall, even though at times some of the css'ing was pretty tedious and time consuming and ended up posing more of a time consumation than estimated, this assignment was very helpful and satisfying to create and will definitely be something i'll be showing off to my friends even though them actually using it encode would be a very bad idea!

