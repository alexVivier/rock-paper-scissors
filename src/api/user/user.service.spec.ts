import { Model } from "mongoose";
import { User, UserDocument } from "../../schemas/user.schema";
import { UserService } from "./user.service";
import { Game } from "../../schemas/game.schema";
import { mockRepository, setElement } from "../../common/test/mock-repository";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { GameService } from "../game/game.service";


describe("UserService", () => {

  /**
   * Variables initialization
   */
  let service: UserService;
  let mockU: Model<UserDocument>;

  /**
   * Fake data initialization
   */

  const mockUser = (
    email = "email",
    password = "password",
    pseudo = "pseudo",
  ): User => ({
    email,
    password,
    pseudo
  });

  setElement(mockUser())

  // @ts-ignore
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getModelToken(User.name),
          useValue: mockRepository(mockUser)
        },
        UserService
      ]
    }).compile();
    service = module.get<UserService>(UserService);
    mockU = module.get(getModelToken(User.name));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
})