import { GameService } from "./game.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { Game, GameDocument, GameSchema } from "../../schemas/game.schema";
import { mockRepository } from "../../common/test/mock-repository";
import { CreateGameDto } from "./dto/create-game.dto";
import mock = jest.mock;
import { Model } from "mongoose";


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
    maxRoundToWin = 0
  ): Game => ({
    maxRoundToWin,
    playerScore: 0,
    computerScore: 0,
    rounds: []
  });


  /**
   * Before each describe we initialize Game module to get mocked service
   */

  // @ts-ignore
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Game.name),
          useValue: mockRepository(mockGame, mockGame(2), [mockGame(2)])
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
      expect(mockG.create).toBeCalledWith( {
        ...createGameDtoOk,
        playerScore: 0,
        computerScore: 0,
      });
      expect(res).toBeDefined()
      expect(res.maxRoundToWin).toBe(2);
    });
  });
});