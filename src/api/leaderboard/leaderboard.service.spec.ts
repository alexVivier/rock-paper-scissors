import { User } from "../../schemas/user.schema";
import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "../user/user.service";
import { LeaderboardService } from "./leaderboard.service";


describe("LeaderboardService", () => {

  /**
   * Variables initialization
   */
  let service: LeaderboardService;

  let mockUserService = {
    findAndSortBy: jest.fn(),
  }

  /**
   * Fake data initialization
   */

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

  const bestUser = mockUser(
    "bestEmail",
    "bestPassword",
    "bestPseudo",
    24,
    0,
    24,
  );

  const worstUser = mockUser(
    "worstEmail",
    "worstPassword",
    "worstPseudo",
    0,
    24,
    24,
  );

  const hardcoreUser = mockUser(
    "hardcoreEmail",
    "hardcorePassword",
    "hardcorePseudo",
    24,
    24,
    42,
  );

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
        LeaderboardService
      ]
    }).compile();
    service = module.get<LeaderboardService>(LeaderboardService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe('getLeaderboard function', () => {

    it('should return user array sorted by most game wins', async () => {
      mockUserService.findAndSortBy.mockReturnValue([bestUser, hardcoreUser, worstUser]);
      const res = await service.getLeaderboard(0);
      const index = res.findIndex(el => el.pseudo === bestUser.pseudo);
      expect(index).toBe(0);
    });

    it('should return user array sorted by most game lost', async () => {
      mockUserService.findAndSortBy.mockReturnValue([worstUser, hardcoreUser, bestUser]);
      const res = await service.getLeaderboard(1);
      const index = res.findIndex(el => el.pseudo === worstUser.pseudo);
      expect(index).toBe(0);
    });

    it('should return user array sorted by most game played', async () => {
      mockUserService.findAndSortBy.mockReturnValue([hardcoreUser, worstUser, bestUser]);
      const res = await service.getLeaderboard(2);
      const index = res.findIndex(el => el.pseudo === hardcoreUser.pseudo);
      expect(index).toBe(0);
    });
  })
})