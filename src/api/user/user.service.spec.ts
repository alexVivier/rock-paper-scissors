import { Model } from "mongoose";
import { User, UserDocument } from "../../schemas/user.schema";
import { UserService } from "./user.service";
import { mockRepository, setElement, setElements } from "../../common/test/mock-repository";
import { Test, TestingModule } from "@nestjs/testing";
import { getModelToken } from "@nestjs/mongoose";
import { SignupAuthDto } from "../../auth/dto/signup-auth.dto";
import mock = jest.mock;
const argon2 = require("argon2");


describe("UserService", () => {

  /**
   * Variables initialization
   */
  let service: UserService;
  let mockU: Model<UserDocument>;

  /**
   * Fake data initialization
   */

  let signupDto: SignupAuthDto = {
    password: 'password',
    email: 'email',
    pseudo: 'pseudo'
  }

  const mockUser = (
    email = "email",
    password = "password",
    pseudo = "pseudo",
    winCounter = 0,
    lossCounter = 0,
    playedGames = 0,
  ): User => ({
    email,
    password,
    pseudo,
    winCounter,
    lossCounter,
    playedGames
  });

  const user = mockUser()

  setElement(user)

  /**
   * Spy on different npm modules function
   */
  let hashSpy = jest.spyOn(argon2, "hash").mockImplementation(async () => "hash");

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

  describe('signup function', () => {

    it('should hash password and return new user', async () => {

      const res = await service.signup(signupDto);
      expect(hashSpy).toBeCalledWith("password");
      expect(mockU.create).toBeCalled();
      expect(res).toBe(user);
    })
  })

  describe('findOne function', () => {
    it('should return filtered user', async () => {
      const filter = {
        pseudo: "pseudo"
      }
      const res = await service.findOne(filter);
      expect(res).toBe(user);
      expect(mockU.findOne).toBeCalledWith(filter);
    })
  })

  describe('addWin function', () => {
    it('should return user updated', async () => {
      const res = await service.addWin("id");
      expect(mockU.findOne).toBeCalledWith({
        _id: "id"
      });
      expect(mockU.updateOne).toBeCalled();
      expect(res).toBeDefined();
    })
  })

  describe('addLose function', () => {
    it('should return user updated', async () => {
      const res = await service.addLose("id");
      expect(mockU.findOne).toBeCalledWith({ _id: "id" });
      expect(mockU.updateOne).toBeCalled();
      expect(res).toBeDefined();
    })
  })
})