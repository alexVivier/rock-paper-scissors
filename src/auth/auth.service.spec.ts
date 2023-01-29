import { Test, TestingModule } from "@nestjs/testing";
import { User } from "../schemas/user.schema";
import { UserService } from "../api/user/user.service";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { LoginAuthDto } from "./dto/login-auth.dto";
import { HttpException, HttpStatus } from "@nestjs/common";
import { SignupAuthDto } from "./dto/signup-auth.dto";

const argon2 = require("argon2");


describe("AuthService", () => {

  /**
   * Variables initialization
   */
  let user: User = new User();

  let userService = {
    signup: jest.fn(async () => user),
    findOne: jest.fn(() => user)
  };

  let jwtService = {
    sign: jest.fn(() => "token")
  };

  let service: AuthService;

  /**
   * Fake data initialization
   */

  let loginDto: LoginAuthDto = {
    password: "password",
    email: "email"
  };

  let signupDto: SignupAuthDto = {
    password: 'password',
    email: 'email',
    pseudo: 'pseudo'
  }

  /**
   * Spy on different npm modules function
   */
  let verifySpy = jest.spyOn(argon2, "verify").mockImplementation(() => true);

  /**
   * Before each describe we initialize Game module to get mocked service
   */

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

  describe("signToken function", () => {

    it("should sign and return valid token", () => {

      const res = service.signToken(new User());
      expect(res).toBe("token");
      expect(jwtService.sign).toBeCalled();
    });
  });

  describe("login function", () => {

    it("should log user and return jwt token", async () => {
      const res = await service.login(loginDto);
      expect(res).toBe("token");
      expect(userService.findOne).toBeCalledWith({
        email: loginDto.email
      });
      expect(verifySpy).toBeCalledWith(user.password, loginDto.password);
    });

    it("should error because no user found", async () => {
      userService.findOne.mockImplementation(() => null)
      await expect(async () => await service.login(loginDto))
        .rejects
        .toThrow(new HttpException("Error while login.", HttpStatus.BAD_REQUEST));
    });

    it("should error because password isn't valid", async () => {
      verifySpy.mockImplementation(() => false);
      userService.findOne.mockImplementation(() => user);
      loginDto.password = "wrongPassword"
      await expect(async () => await service.login(loginDto))
        .rejects
        .toThrow(new HttpException("Error while login.", HttpStatus.BAD_REQUEST));
    });
  });

  describe('signup function', () => {
    it('should signup correclty', async () => {
      const res = await service.signup(signupDto);
      expect(userService.signup).toBeCalledWith(signupDto);
      expect(res).toBe("token");
    })
  })
});