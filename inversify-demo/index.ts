import "reflect-metadata";
import { inject, injectable, Container } from "inversify";

export interface Engine {
  start(): void;
}

@injectable()
export class V8Engine implements Engine {
  start() {
    console.log("V8 engine started!");
  }
}

@injectable()
export class Car {
  private engine: Engine;

  constructor(@inject("Engine") engine: Engine) {
    this.engine = engine;
  }

  drive() {
    this.engine.start();
    console.log("Car is driving...");
  }
}

// Create the container
const container = new Container();

// Bind the Engine interface to the V8Engine implementation
container.bind<Engine>("Engine").to(V8Engine);

// Bind the Car class
container.bind<Car>("Car").to(Car);

// Resolve the Car instance
const myCar = container.get<Car>("Car");

// Use the Car instance
myCar.drive();
