import { Injectable } from "@nestjs/common";
import {
  RobotConfigDto,
  Robot,
  Direction,
  MapSize,
  Instruction,
  RobotStep,
} from "../types";

import * as utils from "../utils";

@Injectable()
export class FunctionalAppService {
  runFunctionalRobot({ mapSize, startRobot, instructions }: RobotConfigDto) {
    const initialStep: RobotStep = {
      ...startRobot,
      instruction: Instruction.NOP,
    };

    const robotSteps = instructions.split("").reduce(
      (acc, instruction: Instruction) => {
        const robot = utils.handleInstruction(
          instruction,
          acc.at(-1),
          mapSize,
          this.moveForward,
        );

        const robotStep: RobotStep = { ...robot, instruction };

        return [...acc, robotStep];
      },
      [initialStep],
    );

    return robotSteps;
  }

  private moveForward(startRobot: Robot, mapSize: MapSize): Robot {
    const robot: Robot = (() => {
      switch (startRobot.direction) {
        case Direction.North:
          return { ...startRobot, y: startRobot.y - 1 };
        case Direction.East:
          return { ...startRobot, x: startRobot.x + 1 };
        case Direction.South:
          return { ...startRobot, y: startRobot.y + 1 };
        case Direction.West:
          return { ...startRobot, x: startRobot.x - 1 };
      }
    })();

    utils.throwErrorIfOutOfBounds(robot, mapSize);

    return robot;
  }
}
