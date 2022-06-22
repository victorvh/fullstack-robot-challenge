import { Body, Controller, Post } from "@nestjs/common";
import { FunctionalAppService } from "./functional/functional-app.service";
import { MathematicalAppService } from "./mathematical/mathematical-app.service";
import { ObjectOrientedAppService } from "./object-oriented/object-oriented-app.service";

import { ProceduralAppService } from "./procedural/procedural-app.service";
import { RobotConfigDto } from "./types";

@Controller()
export class AppController {
  constructor(
    private readonly proceduralAppService: ProceduralAppService,
    private readonly objectOrientedAppService: ObjectOrientedAppService,
    private readonly functionalAppService: FunctionalAppService,
    private readonly mathematicalAppService: MathematicalAppService,
  ) {}

  @Post("/run-procedural-robot")
  runProceduralRobot(@Body() robotConfigDto: RobotConfigDto) {
    return this.proceduralAppService.runProceduralRobot(robotConfigDto);
  }

  @Post("/run-objectOriented-robot")
  runObjectOrientedRobot(@Body() robotConfigDto: RobotConfigDto) {
    return this.objectOrientedAppService.runObjectOrientedRobot(robotConfigDto);
  }

  @Post("/run-functional-robot")
  runFunctionalRobot(@Body() robotConfigDto: RobotConfigDto) {
    return this.functionalAppService.runFunctionalRobot(robotConfigDto);
  }

  @Post("/run-mathematical-robot")
  runMathematicalRobot(@Body() robotConfigDto: RobotConfigDto) {
    return this.mathematicalAppService.runMathematicalRobot(robotConfigDto);
  }
}
