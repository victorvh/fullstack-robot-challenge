import { MathRobot } from "./mathematical/types";
import { Direction, Instruction, MapSize, Robot } from "./types";

export const turnRightMap = new Map<Direction, Direction>([
  [Direction.North, Direction.East],
  [Direction.East, Direction.South],
  [Direction.South, Direction.West],
  [Direction.West, Direction.North],
]);

export const turnLeftMap = new Map<Direction, Direction>([
  [Direction.North, Direction.West],
  [Direction.East, Direction.North],
  [Direction.South, Direction.East],
  [Direction.West, Direction.South],
]);

export function turnRight(robot: Robot): Robot {
  return { ...robot, direction: turnRightMap.get(robot.direction) };
}

export function turnLeft(robot: Robot): Robot {
  return { ...robot, direction: turnLeftMap.get(robot.direction) };
}

export function handleInstruction(
  instruction: string,
  robot: Robot,
  mapSize: MapSize,
  moveForward: (robot: Robot, mapSize: MapSize) => Robot,
) {
  switch (instruction) {
    case Instruction.Right:
      return turnRight(robot);
    case Instruction.Left:
      return turnLeft(robot);
    case Instruction.Forward:
      return moveForward(robot, mapSize);
  }
}

export function throwErrorIfOutOfBounds(
  robot: Robot | MathRobot,
  mapSize: MapSize,
) {
  const positionBelowZero = robot.x < 0 || robot.y < 0;
  const positionAboveMapSize =
    robot.x >= mapSize.width || robot.y >= mapSize.height;

  if (positionBelowZero || positionAboveMapSize) {
    console.log(robot);
    throw new Error("Robot is out of bounds");
  }
}
