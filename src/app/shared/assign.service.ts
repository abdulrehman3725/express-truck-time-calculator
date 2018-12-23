import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Assign} from './assign.model';

@Injectable({
  providedIn: 'root'
})
export class AssignService {

  assignment: Assign;
  assignments: Assign[];

  readonly baseUrl = 'http://localhost:3000/assignment';

  constructor(private http: HttpClient) { }

  postAssign(Assign:Assign){
    return this.http.post(this.baseUrl, Assign);
  }

  getAssignList()
  {
    return this.http.get(this.baseUrl);
  }

  putAssign(Assign:Assign)
  {
    return this.http.put(this.baseUrl + `/actualArrival/${Assign._id}`,Assign);
  }

  putAssignEdit(Assign:Assign)
  {
    return this.http.put(this.baseUrl + `/editAssign/${Assign._id}`,Assign);
  }

  putDepart(Assign:Assign)
  {
    return this.http.put(this.baseUrl + `/departTime/${Assign._id}`,Assign);
  }

  putDropOff(Assign:Assign)
  {
    this.assignment = Assign
    this.assignment.waitingTime = null;
    return this.http.put(this.baseUrl + `/dropOff/${Assign._id}`,Assign);
  }

  putCountEnd(date:Date,_id:string)
  {
    this.assignment.countEndTime = date;
    this.assignment._id = _id;
    return this.http.put(this.baseUrl + `/countEnd/${this.assignment._id}`,this.assignment);
  }

  putWaitingTime(waitingTime:string,_id:string)
  {
    console.log('id = '+_id);
    this.assignment.waitingTime = waitingTime;
    this.assignment._id = _id;
    return this.http.put(this.baseUrl + `/waitingTime/${this.assignment._id}`,this.assignment);
  }

  deleteAssign(_id:string)
  {
    return this.http.delete(this.baseUrl + `/${_id}`);
  }
}
