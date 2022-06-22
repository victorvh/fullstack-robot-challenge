import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { FunctionalAppService } from "./functional/functional-app.service";
import { MathematicalAppService } from "./mathematical/mathematical-app.service";
import { ObjectOrientedAppService } from "./object-oriented/object-oriented-app.service";
import { ProceduralAppService } from "./procedural/procedural-app.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    ProceduralAppService,
    ObjectOrientedAppService,
    FunctionalAppService,
    MathematicalAppService,
  ],
})
export class AppModule {}
