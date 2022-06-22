import { Injectable } from "@nestjs/common";
import { Instruction, RobotConfigDto } from "../types";
import { RobotClass } from "./robot.class";

@Injectable()
export class ObjectOrientedAppService {
  runObjectOrientedRobot({
    mapSize,
    startRobot,
    instructions,
  }: RobotConfigDto) {
    const robot = new RobotClass(mapSize, startRobot);

    robot.saveStep(Instruction.NOP);

    const instructionList = instructions.split("");

    instructionList.forEach((instruction) => {
      robot.handleInstruction(instruction);
    });

    return robot.steps;
  }
}
