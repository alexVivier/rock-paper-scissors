import { Injectable } from "@nestjs/common";
import { Game, GameDocument } from "../../schemas/game.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { CreateGameDto } from "./dto/create-game.dto";

@Injectable()
export class GameService {

  constructor(@InjectModel(Game.name) private gameModel: Model<Game>) {
  }

  createGame(body: CreateGameDto) {
    body.playerScore = 0;
    body.computerScore = 0;
    return this.gameModel.create(body);
  }

  getGame(_id: string) {
    return this.gameModel.findById(_id);
  }

  async addPlayedRound(_id: string, round) {
    // Find the game to update
    const game = await this.gameModel.findById(_id);

    // Check who wins this round
    const result = this.checkWinner(round);

    // If player wins increment score
    if (result === 1) {
      game.playerScore++;
      round.winner = "player";
    }

    // Else if computer wins increment score
    else if (result === -1) {
      game.computerScore++;
      round.winner = "computer";
    }

    // Add played round to game history
    game.rounds.push(round);

    // Check if game is over, if yes, set game status tu finished
    if (this.isGameOver(game)) {
      game.status = 'finished';
    }

    // Update and return game
    await game.save();
    return game;
  }

  checkWinner({ computerChoice, playerChoice }) {
    // Tableau des règles de jeu
    const gameRules = {
      "rock": "scissors",
      "paper": "rock",
      "scissors": "paper"
    };
    // Check if it's a draw
    if (playerChoice === computerChoice) {
      return 0;
    }
    // Check if player wins
    else if (gameRules[playerChoice] === computerChoice) {
      return 1;
    }
    // Else, computer wins
    else {
      return -1;
    }
  }

  isGameOver({maxRoundToWin, playerScore, computerScore}) {
    // Check if computer or player has reached the number of wins needed to finish game
    return computerScore >= maxRoundToWin || playerScore >= maxRoundToWin;
  }

  getComputerChoice() {
    // Array with all possible choices
    const choices = ["rock", "paper", "scissors"];
    // Generate random int between 0 and the lenght of choices array
    const randomIndex = Math.floor(Math.random() * choices.length);
    // Return corresponding choice
    return choices[randomIndex];
  }
}