import {Test, TestingModule} from "@nestjs/testing";
import {INestApplication, ValidationPipe} from "@nestjs/common";
import {AppModule} from "../../app.module";
import { e2eGameTests } from "./tests/game.e2e-spec";

export let testApplication: INestApplication;

const e2eTests = [
  {title: "GameController", func: e2eGameTests},
];

export const createTestingModule = () => {
  return Test.createTestingModule({
    imports: [AppModule],
  })
}

describe("\n    E2E Tests", () => {

  beforeAll(async () => {
    jest.setTimeout(1000000)
    const module: TestingModule = await createTestingModule().compile()
    testApplication = module.createNestApplication();
    testApplication.useGlobalPipes(new ValidationPipe({whitelist: true, transform: true}));
    await testApplication.init();
  })

  describe.each(e2eTests)("---------", (e2eTest) => {
    describe("\n    " + e2eTest.title, e2eTest.func)
  })

  afterAll(async () => {
    await testApplication.close()
  })

})
