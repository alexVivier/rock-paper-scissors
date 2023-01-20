import { GameService } from "./game.service";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { Game, GameDocument, GameSchema } from "../../schemas/game.schema";
import { MockRepository } from "../../common/test/mock-repository";
import { CreateGameDto } from "./dto/create-game.dto";
import mock = jest.mock;


describe("GameService", () => {

  /**
   * Variables initialization
   */
  let service: GameService;
  let mockG;
  let mockGClass;

  /**
   * Fake data initialization
   */
  let createGameDtoOk: CreateGameDto = {
    maxRoundToWin: 2
  }

  let createGameDtoKo: CreateGameDto = {
    maxRoundToWin: -1
  }


  /**
   * Before each describe we initialize Game module to get mocked service
   */

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(Game.name),
          useValue: new MockRepository<Game>()
        },
        GameService,
      ]
    }).compile();
    service = module.get<GameService>(GameService);
    mockG = module.get(getModelToken(Game.name));
    console.log({mockG});
  });


  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("createGame function", () => {
    it("should create new Game with right settings", async () => {
      const res = await service.createGame(createGameDtoOk);
      console.log({res});
    });
  });
});