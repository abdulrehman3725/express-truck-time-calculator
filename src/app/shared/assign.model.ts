import { Time } from "@angular/common";

export class Assign {
    _id: string;
    name: string;
    code: string;
    appointmentTime: Date;
    scheduledTime: Date;
    actualArrival: Date;
    status: string;
    departTime: Date;
    hosCount: Date;
    countEndTime: Date;
    dropOffTime: Date;
    duration: Number;
    waitingTime: String;
    nextReset: Date;

    constructor( name: string, code:string, appointmentTime: Date, scheduledTime: Date){

        this.name = name;
        this.code = code;
        this.appointmentTime = appointmentTime;
        this.scheduledTime = scheduledTime;
        this.actualArrival = null;
        this.status = "";
        this.departTime= null;
        this.hosCount= null;
        this.countEndTime= null;
        this.dropOffTime= null;
        this.duration= null;
        this.waitingTime= null;
        this.nextReset= null;
    }
}
