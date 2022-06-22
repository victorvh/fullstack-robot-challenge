import { Test, TestingModule } from "@nestjs/testing";
import { AppController } from "./app.controller";
import { FunctionalAppService } from "./functional/functional-app.service";
import { MathematicalAppService } from "./mathematical/mathematical-app.service";
import { ObjectOrientedAppService } from "./object-oriented/object-oriented-app.service";
import { ProceduralAppService } from "./procedural/procedural-app.service";
import { Direction } from "./types";

describe("AppController", () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        ProceduralAppService,
        ObjectOrientedAppService,
        FunctionalAppService,
        MathematicalAppService,
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  const exampleOneInput = {
    mapSize: { width: 5, height: 5 },
    startRobot: { x: 1, y: 2, direction: Direction.North },
    instructions: "RFRFFRFRF",
  };

  const exampleTwoInput = {
    mapSize: { width: 5, height: 5 },
    startRobot: { x: 0, y: 0, direction: Direction.East },
    instructions: "RFLFFLRF",
  };

  const exampleOneAnswer = [
    { x: 1, y: 2, direction: "N", instruction: "" },
    { x: 1, y: 2, direction: "E", instruction: "R" },
    { x: 2, y: 2, direction: "E", instruction: "F" },
    { x: 2, y: 2, direction: "S", instruction: "R" },
    { x: 2, y: 3, direction: "S", instruction: "F" },
    { x: 2, y: 4, direction: "S", instruction: "F" },
    { x: 2, y: 4, direction: "W", instruction: "R" },
    { x: 1, y: 4, direction: "W", instruction: "F" },
    { x: 1, y: 4, direction: "N", instruction: "R" },
    { x: 1, y: 3, direction: "N", instruction: "F" },
  ];

  const exampleTwoAnswer = [
    { x: 0, y: 0, direction: "E", instruction: "" },
    { x: 0, y: 0, direction: "S", instruction: "R" },
    { x: 0, y: 1, direction: "S", instruction: "F" },
    { x: 0, y: 1, direction: "E", instruction: "L" },
    { x: 1, y: 1, direction: "E", instruction: "F" },
    { x: 2, y: 1, direction: "E", instruction: "F" },
    { x: 2, y: 1, direction: "N", instruction: "L" },
    { x: 2, y: 1, direction: "E", instruction: "R" },
    { x: 3, y: 1, direction: "E", instruction: "F" },
  ];

  describe("test procedural service", () => {
    describe("procedural example 1: 5x5 (1,2,N)", () => {
      it('should should end at "1 3 N"', () => {
        expect(appController.runProceduralRobot(exampleOneInput)).toStrictEqual(
          exampleOneAnswer,
        );
      });
    });

    describe("procedural example 2: 5x5 (0,0,E)", () => {
      it('should end at "3 1 E"', () => {
        expect(appController.runProceduralRobot(exampleTwoInput)).toStrictEqual(
          exampleTwoAnswer,
        );
      });
    });
  });

  describe("test object oriented service", () => {
    describe("object oriented example 1: 5x5 (1,2,N)", () => {
      it('should should end at "1 3 N"', () => {
        expect(
          appController.runObjectOrientedRobot(exampleOneInput),
        ).toStrictEqual(exampleOneAnswer);
      });
    });

    describe("object oriented example 2: 5x5 (0,0,E)", () => {
      it('should end at "3 1 E"', () => {
        expect(
          appController.runObjectOrientedRobot(exampleTwoInput),
        ).toStrictEqual(exampleTwoAnswer);
      });
    });
  });

  describe("test functional service", () => {
    describe("functional example 1: 5x5 (1,2,N)", () => {
      it('should should end at "1 3 N"', () => {
        expect(appController.runFunctionalRobot(exampleOneInput)).toStrictEqual(
          exampleOneAnswer,
        );
      });
    });

    describe("functional example 2: 5x5 (0,0,E)", () => {
      it('should end at "3 1 E"', () => {
        expect(appController.runFunctionalRobot(exampleTwoInput)).toStrictEqual(
          exampleTwoAnswer,
        );
      });
    });
  });

  describe("test mathematical service", () => {
    describe("mathematical example 1: 5x5 (1,2,N)", () => {
      it('should should end at "1 3 N"', () => {
        expect(
          appController.runMathematicalRobot(exampleOneInput),
        ).toStrictEqual(exampleOneAnswer);
      });
    });

    describe("mathematical example 2: 5x5 (0,0,E)", () => {
      it('should end at "3 1 E"', () => {
        expect(
          appController.runMathematicalRobot(exampleTwoInput),
        ).toStrictEqual(exampleTwoAnswer);
      });
    });
  });
});
