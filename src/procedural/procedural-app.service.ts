import { Injectable } from "@nestjs/common";

import { Direction, MapSize, Robot, RobotConfigDto } from "../types";
import * as utils from "../utils";

@Injectable()
export class ProceduralAppService {
  runProceduralRobot({ mapSize, startRobot, instructions }: RobotConfigDto) {
    let robot = startRobot;
    let steps = [{ ...robot, instruction: "" }];

    for (let i = 0; i < instructions.length; i++) {
      const instruction = instructions[i];

      robot = utils.handleInstruction(
        instruction,
        robot,
        mapSize,
        this.moveForward,
      );

      steps.push({ ...robot, instruction });
    }

    return steps;
  }

  private moveForward(startRobot: Robot, mapSize: MapSize): Robot {
    let robot: Robot;

    switch (startRobot.direction) {
      case Direction.North:
        robot = { ...startRobot, y: startRobot.y - 1 };
        break;
      case Direction.East:
        robot = { ...startRobot, x: startRobot.x + 1 };
        break;
      case Direction.South:
        robot = { ...startRobot, y: startRobot.y + 1 };
        break;
      case Direction.West:
        robot = { ...startRobot, x: startRobot.x - 1 };
        break;
    }

    utils.throwErrorIfOutOfBounds(robot, mapSize);

    return robot;
  }
}
