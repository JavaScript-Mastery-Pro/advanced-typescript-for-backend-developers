import { Schema, Document, model } from "mongoose";

export enum EventType {
  Workshop = "workshop",
  Talk = "talk",
}

export interface IEvent {
  title: string;
  description: string;
  date: Date;
  type: EventType;
}

export interface IEventDocument extends IEvent, Document {}

const EventSchema: Schema = new Schema<IEvent>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, enum: Object.values(EventType), required: true },
  },
  { timestamps: true }
);

const Event = model<IEvent>("Event", EventSchema);

export default Event;
