import * as request from "supertest";
import { testApplication } from "../test.e2e-spec";

let game;

export const createGame = (maxRoundToWin, status) => {
  return request(testApplication.getHttpServer())
    .post("/game")
    .send({ maxRoundToWin })
    .expect(status);
};

export const getComputerChoice = (status) => {
  return request(testApplication.getHttpServer())
    .get("/game/computer-choice")
    .expect(status);
};

export const getById = (id, status) => {
  return request(testApplication.getHttpServer())
    .get("/game/" + id)
    .expect(status);
};

export const addPlayedRound = (id, body, status) => {
  return request(testApplication.getHttpServer())
    .post("/game/" + id + "/round-finished")
    .send(body)
    .expect(status);
}

export const e2eGameTests = () => {

  describe("Create game", () => {
    it("should create a new game", async () => {
      const res = (await createGame(2, 201)).body;
      expect(res.playerScore).toBe(0);
      expect(res.computerScore).toBe(0);
      expect(res.winner).toBe(null);
      expect(res._id).toBeDefined();
      expect(res.rounds).toBeDefined();
      expect(res.maxRoundToWin).toBe(2);
      game = res;
    });

    it("should not create game and throw 400 err", async () => {
      await createGame(-1, 400);
    });
  });

  describe("Get computer choice", () => {

    it("should return random choice", async () => {
      const res = (await getComputerChoice(200)).text;
      expect(res).toBeDefined();
    });
  });

  describe('Get game by id', () => {

    it('should return game', async () => {
      const res = (await getById(game._id, 200)).body;
      expect(res._id).toBeDefined();
    })
  })

  describe('Add played round', () => {

    it('should play round then return game updated with player as winner', async () => {
      const res = (await addPlayedRound(game._id, {
        computerChoice: "rock",
        playerChoice: "paper",
      }, 201)).body;
      expect(res.playerScore).toBeGreaterThan(res.computerScore);
      expect(res.rounds.length).toBeGreaterThan(game.rounds.length)
    })

    it('should play round then return game updated with computer as winner', async () => {
      game = (await createGame(2, 201)).body;
      const res = (await addPlayedRound(game._id, {
        computerChoice: "scissors",
        playerChoice: "paper",
      }, 201)).body
      expect(res.playerScore).toBeLessThan(res.computerScore);
      expect(res.rounds.length).toBeGreaterThan(game.rounds.length)
    })

    it("should play round then return game updated with no score moves because it's a draw", async () => {
      game = (await createGame(2, 201)).body;
      const res = (await addPlayedRound(game._id, {
        computerChoice: "paper",
        playerChoice: "paper",
      }, 201)).body;
      expect(res.playerScore).toBe(res.computerScore);
      expect(res.rounds.length).toBeGreaterThan(game.rounds.length);
    })
  })
};