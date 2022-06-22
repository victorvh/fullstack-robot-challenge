import { IsInt, IsNumber, IsPositive, Max, Min } from "class-validator";
import { Instruction } from "src/types";

export interface MathRobot {
  x: number;
  y: number;
  direction: Vector;
}

export interface MathRobotStep extends MathRobot {
  instruction: Instruction;
}

export interface Vector {
  x: number;
  y: number;
}
