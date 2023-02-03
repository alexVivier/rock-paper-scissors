
export const leaderboardStrategies = {
  0: mostWins,
  1: fewestWins,
  2: mostGames,
}

function mostWins() {
  return '-winCounter'
}

function fewestWins() {
  return '-lossCounter'
}

function mostGames() {
  return '-playedGames'
}