# rock-paper-scissors
Rock paper scissors assignment for Sweepbright

## Project installation

To play this rock paper scissors game you will have to install the api locally then install the client using npm globally

### API

1. Clone this project

```
git clone https://github.com/alexVivier/rock-paper-scissors.git
```

2. Install deps

```
cd rock-paper-scissors
npm install
```

3. Create mongo collection on your localhost server with the following name
```
rockpaperscissors
```

4. Start server
```
npm run start
```

### Client

The client is a CLI published on npm.

Please follow the package docs on this [link](https://www.npmjs.com/package/rock-paper-scissors-client) to install and play rock-paper-scissors.

### Tests

This API is tested using jest.

To run unit tests :
````
npm run test:unit
````
To see the coverage of unit tests :
````
npm run test:unit:cov
````
To run end to end tests :
````
npm run test:e2e
````
To see the coverage of the end to end tests :
````
npm run test:e2e:cov
````

### Coming features

#### Auth

I want to add auth feature to let user save and get their previous games

It's mandatory for the leaderboard feature.

#### Leaderboard

The leaderboard aims to show best players. It will have differents leaderboards :
 - Longest games
 - Players with most games
 - Computer best victims
