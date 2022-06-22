import { Direction, Instruction, MapSize, Robot, RobotStep } from "../types";
import * as utils from "../utils";

export class RobotClass {
  steps: RobotStep[] = [];
  x: number;
  y: number;
  direction: Direction;

  constructor(public mapSize: MapSize, startRobot: Robot) {
    this.x = startRobot.x;
    this.y = startRobot.y;
    this.direction = startRobot.direction;
  }

  handleInstruction(instruction: string) {
    switch (instruction) {
      case Instruction.Right:
        this.turnRight();
        break;
      case Instruction.Left:
        this.turnLeft();
        break;
      case Instruction.Forward:
        this.moveForward();
    }
  }

  moveForward() {
    switch (this.direction) {
      case Direction.North:
        this.y--;
        break;
      case Direction.East:
        this.x++;
        break;
      case Direction.South:
        this.y++;
        break;
      case Direction.West:
        this.x--;
    }

    this.saveStep(Instruction.Forward);
  }

  turnRight() {
    this.direction = utils.turnRightMap.get(this.direction);
    this.saveStep(Instruction.Right);
  }

  turnLeft() {
    this.direction = utils.turnLeftMap.get(this.direction);
    this.saveStep(Instruction.Left);
  }

  saveStep(instruction: Instruction) {
    this.steps.push({
      x: this.x,
      y: this.y,
      direction: this.direction,
      instruction,
    });
  }
}
