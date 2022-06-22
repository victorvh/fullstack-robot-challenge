import { Type } from "class-transformer";
import {
  IsDefined,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNotEmptyObject,
  IsPositive,
  IsString,
  ValidateNested,
} from "class-validator";

export enum Instruction {
  Right = "R",
  Left = "L",
  Forward = "F",
  NOP = "",
}

export enum Direction {
  North = "N",
  East = "E",
  South = "S",
  West = "W",
}

export class MapSize {
  @IsInt()
  @IsPositive()
  width: number;

  @IsInt()
  @IsPositive()
  height: number;
}

export class Robot {
  @IsInt()
  @IsPositive()
  x: number;

  @IsInt()
  @IsPositive()
  y: number;

  @IsEnum(Direction)
  direction: Direction;
}

export class RobotStep extends Robot {
  @IsEnum(Instruction)
  instruction: Instruction;
}

export class RobotConfigDto {
  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => MapSize)
  mapSize: MapSize;

  @IsDefined()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => Robot)
  startRobot: Robot;

  @IsString()
  @IsNotEmpty()
  instructions: string;
}
