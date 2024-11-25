import { Model } from "mongoose";
import { injectable } from "inversify";

import { GenericService } from "./generic";
import Event, { IEventDocument } from "@/models/event";

@injectable()
export class EventService extends GenericService<IEventDocument> {
  constructor() {
    // Inject the Event model
    super(Event as Model<IEventDocument>);
  }

  // You can add custom methods specific to Event if needed
}
