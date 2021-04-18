import { KeysOfKeyOrAnys } from "./utils";
import EventChannel from "./EventChannel";
import Suscriptor from "./Suscriptor";

export default abstract class SingleChannelBroker<EventList> {
    private event_channel:EventChannel<EventList, keyof EventList>

    constructor(){
        this.event_channel = new class extends EventChannel<EventList, keyof EventList>{
            event_type;
        };
    }

    public get suscriptors():Set<Suscriptor<EventList, keyof EventList>> {
        return this.event_channel.suscriptors;
    }

    public add_suscriptor(suscriptor:Suscriptor<EventList, keyof EventList>):void {
        this.event_channel.add_suscriptor(suscriptor);
    }

    public remove_suscriptor(suscriptor:Suscriptor<EventList, keyof EventList>):void {
        this.event_channel.remove_suscriptor(suscriptor);
    }

    public emit<Event extends keyof EventList>(event_type:Event, ...args:KeysOfKeyOrAnys<EventList, Event>):void {
        this.event_channel.suscriptors.forEach(suscriptor => {
            if(suscriptor.event_type === event_type){
                suscriptor.notified(...args);
            }
        });
    }
}
