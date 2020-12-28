import Broker from "./Broker";
import Suscriptor from "./Suscriptor";
import {KeysOfKeyOrAnys} from "./utils";

export default abstract class EventChannel<EventList, Event extends keyof EventList> {
    readonly abstract event_type:Event
    readonly suscriptors:Set<Suscriptor<EventList, Event>> = new Set();
    protected broker:Broker<EventList>

    constructor(broker:Broker<EventList>){
        this.broker = broker;
    }

    public add_suscriptor(suscriptor:Suscriptor<EventList, Event>):this {
        this.suscriptors.add(suscriptor);
        suscriptor.event_channel = this;
        return this;
    }

    public remove_suscriptor(suscriptor:Suscriptor<EventList, Event>):this {
        this.suscriptors.delete(suscriptor);
        return this;
    }

    public notify_all(...args:KeysOfKeyOrAnys<EventList, Event>):void {
        this.suscriptors.forEach(suscriptor => suscriptor.notified(...args));
    }
}
