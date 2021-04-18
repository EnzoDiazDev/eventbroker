import { EventEmitter } from "events";
import EventChannel from "./EventChannel";
import {KeysOfKeyOrAnys} from "./utils";


export default abstract class Broker<EventList> {
    readonly productor:EventEmitter
    readonly event_channels:Set<EventChannel<EventList, keyof EventList>> = new Set();

    constructor(productor:EventEmitter){
        this.productor = productor;
    }

    public on<Event extends keyof EventList, Channel extends EventChannel<EventList, Event>>(event:Event, channel:Channel):void {
        let is_in_productor = false;
        this.event_channels.forEach(event_channel => {
            if(event_channel.event_type === event) is_in_productor = true;
        });

        if(!is_in_productor){
            this.productor.on(event as string, (...args:any[]) => {
                this.emit(event, ...args as KeysOfKeyOrAnys<EventList, Event>);
            });
        }

        this.event_channels.add(channel);
    }

    public emit<Event extends keyof EventList>(event_type:Event, ...args:KeysOfKeyOrAnys<EventList, Event>):void {
        this.event_channels.forEach(event_channel => {
            if(event_channel.event_type === event_type) {
                event_channel.notify_all(...args);
            }
        });
    }
}
