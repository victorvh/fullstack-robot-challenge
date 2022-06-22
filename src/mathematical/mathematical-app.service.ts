import { Injectable } from "@nestjs/common";

import {
  Direction,
  Instruction,
  MapSize,
  Robot,
  RobotConfigDto,
  RobotStep,
} from "../types";
import * as utils from "../utils";
import { MathRobot, MathRobotStep, Vector } from "./types";

@Injectable()
export class MathematicalAppService {
  runMathematicalRobot({ mapSize, startRobot, instructions }: RobotConfigDto) {
    const { initialStep, instructionList } = this.convertToMathRobots(
      startRobot,
      instructions,
    );

    const robotSteps = instructionList.reduce(
      (acc, instruction) => {
        const robot = this.handleInstructions(instruction, acc.at(-1), mapSize);

        const robotStep: MathRobotStep = { ...robot, instruction };

        return [...acc, robotStep];
      },
      [initialStep],
    );

    return this.formatRobotSteps(robotSteps);
  }

  private turnRight(robot: MathRobot): MathRobot {
    return {
      ...robot,
      direction: {
        x: -robot.direction.y,
        y: robot.direction.x,
      },
    };
  }

  private turnLeft(robot: MathRobot): MathRobot {
    return {
      ...robot,
      direction: {
        x: robot.direction.y,
        y: -robot.direction.x,
      },
    };
  }

  private moveForward(robot: MathRobot, mapSize: MapSize): MathRobot {
    const newRobot = {
      x: robot.x + robot.direction.x,
      y: robot.y + robot.direction.y,
      direction: robot.direction,
    };

    utils.throwErrorIfOutOfBounds(newRobot, mapSize);

    return newRobot;
  }

  private handleInstructions(
    instruction: Instruction,
    robot: MathRobot,
    mapSize: MapSize,
  ): MathRobot {
    switch (instruction) {
      case Instruction.Right:
        return this.turnRight(robot);
      case Instruction.Left:
        return this.turnLeft(robot);
      case Instruction.Forward:
        return this.moveForward(robot, mapSize);
    }
  }

  private directionToVector = new Map<Direction, Vector>([
    [Direction.North, { x: 0, y: -1 }],
    [Direction.East, { x: 1, y: 0 }],
    [Direction.South, { x: 0, y: 1 }],
    [Direction.West, { x: -1, y: 0 }],
  ]);

  private vectorToDirection(vector: Vector): Direction {
    if (vector.x === 0 && vector.y === -1) {
      return Direction.North;
    } else if (vector.x === 1 && vector.y === 0) {
      return Direction.East;
    } else if (vector.x === 0 && vector.y === 1) {
      return Direction.South;
    } else if (vector.x === -1 && vector.y === 0) {
      return Direction.West;
    } else {
      throw new Error("Invalid vector");
    }
  }

  private formatRobotSteps(robotSteps: MathRobotStep[]): RobotStep[] {
    return robotSteps.map((rs) => {
      return {
        ...rs,
        direction: this.vectorToDirection(rs.direction),
      };
    });
  }

  private convertToMathRobots(startRobot: Robot, instructions: string) {
    const startMathRobot: MathRobot = {
      ...startRobot,
      direction: this.directionToVector.get(startRobot.direction),
    };

    const initialStep: MathRobotStep = {
      ...startMathRobot,
      instruction: Instruction.NOP,
    };

    const instructionList = instructions.split("") as Instruction[];

    return {
      initialStep,
      instructionList,
    };
  }
}
