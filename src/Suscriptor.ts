import EventChannel from "./EventChannel";
import {KeysOfKeyOrAnys} from "./utils";

export default abstract class Suscriptor<EventList, Event extends keyof EventList> {
    readonly abstract event_type:Event

    protected channel?:EventChannel<EventList, Event>
    public set event_channel(event_channel:EventChannel<EventList, Event>) {
        if(!this.channel) this.channel = event_channel;
    }

    public abstract notified(...args:KeysOfKeyOrAnys<EventList, Event>):void;
}
