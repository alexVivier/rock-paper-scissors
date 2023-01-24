import { GameService } from "./game.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { Game, GameDocument, GameSchema } from "../../schemas/game.schema";
import { element, mockRepository, setElement } from "../../common/test/mock-repository";
import { CreateGameDto } from "./dto/create-game.dto";
import mock = jest.mock;
import { Model } from "mongoose";
import { BadRequestException, HttpException, HttpStatus } from "@nestjs/common";


describe("GameService", () => {

  /**
   * Variables initialization
   */
  let service: GameService;
  let mockG: Model<GameDocument>;

  /**
   * Fake data initialization
   */
  let createGameDtoOk: CreateGameDto = {
    maxRoundToWin: 2
  };

  let createGameDtoKo: CreateGameDto = {
    maxRoundToWin: -1
  };

  const mockGame = (
    maxRoundToWin = 0,
    playerScore = 0,
    computerScore = 0,
    status = 'started',
  ): Game => ({
    status,
    winner: null,
    maxRoundToWin,
    playerScore,
    computerScore,
    rounds: []
  });

  setElement(mockGame(2))


  /**
   * Before each describe we initialize Game module to get mocked service
   */

  // @ts-ignore
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Game.name),
          useValue: mockRepository(mockGame)
        },
        GameService
      ]
    }).compile();
    service = module.get<GameService>(GameService);
    mockG = module.get(getModelToken(Game.name));
  });


  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createGame function", () => {
    it("should create new Game with right settings", async () => {
      const res = await service.createGame(createGameDtoOk);
      expect(mockG.create).toBeCalledWith(createGameDtoOk);
      expect(res).toBeDefined()
      expect(res.maxRoundToWin).toBe(2);
    });

    it('should throw BAD_REQUEST err', async () => {
      await expect(async () => await service.createGame(createGameDtoKo))
        .rejects
        .toThrow(new HttpException('Cannot create game with negative maxRoundToWin', HttpStatus.BAD_REQUEST))
    })
  });

  describe('getGame function', () => {
    it('Should return Game', async () => {
      const res = await service.getGame('id');
      expect(mockG.findById).toBeCalledWith('id');
    })
  })

  describe('checkWinner function', () => {
    it('should return player as winner of a game', async () => {
      const res = await service.checkWinner(mockGame(2, 2, 1))
      expect(res).toBe('player');
    })

    it('should return computer as winner of a game', async () => {
      const res = await service.checkWinner(mockGame(2, 1, 2))
      expect(res).toBe('computer');
    })
  })

  describe('checkRoundWinner function', () => {
    it('should return computer as round winner', () => {
      const res = service.checkRoundWinner({
        computerChoice: "rock",
        playerChoice: "scissors"
      });
      expect(res).toBe(-1)
    })

    it('should return draw round', () => {
      const res = service.checkRoundWinner({
        computerChoice: 'rock',
        playerChoice: 'rock',
      });
      expect(res).toBe(0)
    })

    it('should return player as round winner', () => {
      const res = service.checkRoundWinner({
        computerChoice: 'paper',
        playerChoice: 'scissors'
      })
      expect(res).toBe(1)
    })
  })

  describe("isGameOver function", () => {

    it('should return true because computer as reached max rounds', () => {
      const res = service.isGameOver(mockGame(2, 1, 2))
      expect(res).toBe(true);
    })

    it('should return true because player as reached max rounds', () => {
      const res = service.isGameOver(mockGame(2, 2, 0))
      expect(res).toBe(true);
    })

    it('should return false because neither the player nor the player reached max rounds', () => {
      const res = service.isGameOver(mockGame(2, 1, 0));
      expect(res).toBe(false);
    })
  })

  describe("getComputerChoice function", () => {

    it('should return random choice for computer play', () => {
      const res = service.getComputerChoice();
      expect(res).toBeDefined()
      expect(typeof res).toBe('string');
    })
  })

  describe("addPlayedRound function", () => {

    it('should play game round and player wins', async () => {
      const res = await service.addPlayedRound("id", {
        computerChoice: "rock",
        playerChoice: "paper"
      });

      expect(mockG.bulkSave).toBeCalledWith([element])
      expect(mockG.findById).toBeCalledWith('id')
      expect(mockG.findById).toBeCalledWith("id");
    })

    it('should play game round and computer wins', async () => {
      const res = await service.addPlayedRound("id", {
        computerChoice: "rock",
        playerChoice: "scissors"
      });

      expect(mockG.bulkSave).toBeCalledWith([element])
      expect(mockG.findById).toBeCalledWith('id')
      expect(mockG.findById).toBeCalledWith("id");
    })

    it('should play game round and no one wins', async () => {
      const res = await service.addPlayedRound("id", {
        computerChoice: "scissors",
        playerChoice: "scissors"
      });
      expect(mockG.bulkSave).toBeCalledWith([element])
      expect(mockG.findById).toBeCalledWith('id')
      expect(mockG.findById).toBeCalledWith("id");
    })

    it('should set status to finished', async () => {
      setElement(mockGame(2, 2, 1));
      const res = await service.addPlayedRound("id", {
        computerChoice: "scissors",
        playerChoice: "rock"
      });
      expect(mockG.bulkSave).toBeCalledWith([element])
      expect(mockG.findById).toBeCalledWith('id')
      expect(res.status).toBe('finished');
    })
  })
});