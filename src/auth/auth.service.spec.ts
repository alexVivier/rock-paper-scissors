import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { Game } from "../schemas/game.schema";
import { mockRepository } from "../common/test/mock-repository";
import { GameService } from "../api/game/game.service";
import { User } from "../schemas/user.schema";
import { UserService } from "../api/user/user.service";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";

describe("AuthService", () => {

  /**
   * Variables initialization
   */

  let userService = {
    signup: jest.fn(async () => "token"),
    find: jest.fn(() => new User()),
  }

  let jwtService = {
    sign: jest.fn(() => true)
  }

  let service: AuthService;

  /**
   * Fake data initialization
   */

  /**
   * Before each describe we initialize Game module to get mocked service
   */

  // @ts-ignore
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: userService
        },
        {
          provide: JwtService,
          useValue: jwtService
        },
        AuthService
      ]
    }).compile();
    service = module.get<AuthService>(AuthService);
  });


  it("should be defined", () => {
    expect(service).toBeDefined();
  });
})