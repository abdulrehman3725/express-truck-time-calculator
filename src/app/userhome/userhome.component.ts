import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ModalService } from '../_services';
import {DriverService} from '../shared/driver.service';
import {Driver} from '../shared/driver.model';
import {Assign} from '../shared/assign.model';
import {NgForm} from '@angular/forms';
import {AssignService} from '../shared/assign.service';
import { formatDate } from '@angular/common';
import * as moment from 'moment';


declare var M:any;

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css'],
  providers:[DriverService]
})
export class UserhomeComponent implements OnInit {

  username:String = '';
  drivers:any = [];
  formValues:Assign;
  configure = 
  { leftTime: 5  };
  date:string;

  waitingTime(waitingTime:string)
  {
    
    if(waitingTime == '' || waitingTime == null)
      return null;
    else 
      return waitingTime;
  }

  waitingTimeBool(waitingTime:string)
  { 
    if(waitingTime == '' || waitingTime == null)
      return true;
    else 
      return false;
  }

  configureWaiting(status:string,waitingTime:string,duration:any, dropOffTime:Date,actualArrival:Date,countEndTime:Date,_id:string)
  {
    if(actualArrival != null && dropOffTime )
    {
      var left;

      if(status == 'late')
      {
        //wait count down in secs. 46800000 is milliseconds of 13hrs 30mins
        //we will first first find difference of 13hrs 30min and duration in milliseconds
        var waitCountDown= 48600000 - duration;
        //get hrs and minutes from wait count down
        var diffHrs = Math.floor((waitCountDown % 86400000) / 3600000); // hours
        var diffMins = Math.round(((waitCountDown % 86400000) % 3600000) / 60000); // minutes
       
        //add diffHrs diffMins in the drop off time
        var date = new Date(dropOffTime);
        date.setHours(date.getHours() + diffHrs);
        date.setMinutes(date.getMinutes() + diffMins);
        
        //get current time
        var date2 = new Date();

        //get difference of incremented date and current time. The result will be in milliseconds
        var countDown =   date.getTime() - date2.getTime(); 

        //the wait count down should stop when it is equal to the duration
        //for that we have to find difference again with duration
        var diff =waitCountDown - duration;
        console.log('diff = '+this.convert(diff));
        console.log('countdown = '+ this.convert(countDown));
        console.log('waitCoundown = '+this.convert(waitCountDown));
        //check if countdown milliseconds is less than or equal to waitCountDown
        //AND also check if difference is greater than diff
        if( waitCountDown >= countDown && countDown > diff)
        {
          //convert countDown into seconds because countdown is in milliseconds
          left = (countDown/1000);
        }
        else
        {  
          if(waitingTime == null || waitingTime =='')
          {
            this.assignService.putWaitingTime('Waiting Time has expired',_id).subscribe((res) =>{
              this.refreshAssignmentList();
          });
          }
          left = 0;
        }
      }
      else
      {
        //wait count down in secs. 46800000 is milliseconds of 12hrs 30mins
        //we will first first find difference of 13hrs 30min and duration in milliseconds
        var waitCountDown= 45000000 - duration;
        //get hrs and minutes from wait count down
        var diffHrs = Math.floor((waitCountDown % 86400000) / 3600000); // hours
        var diffMins = Math.round(((waitCountDown % 86400000) % 3600000) / 60000); // minutes
        //add diffHrs diffMins in the drop off time
        var date = new Date(dropOffTime);
        date.setHours(date.getHours() + diffHrs);
        date.setMinutes(date.getMinutes() + diffMins);
        
        //get current time
        var date2 = new Date();
        //get difference of incremented date and current time. The result will be in milliseconds
        var countDown =   date.getTime() - date2.getTime(); 

                //the wait count down should stop when it is equal to the duration
        //for that we have to find difference again with duration
        var diff = waitCountDown - duration;
        console.log('diff = '+this.convert(diff));
        console.log('countdown = '+ this.convert(countDown));
        console.log('waitCoundown = '+this.convert(waitCountDown));

        //check if countdown milliseconds is less than or equal to waitCountDown
        //AND also check if difference is greater than diff
        if( waitCountDown >= countDown && countDown > diff)
        {
          //convert countDown into seconds because countdown is in milliseconds
          left = (countDown/1000);
        }
        else
        {
          if(waitingTime == null || waitingTime =='')
          {
            this.assignService.putWaitingTime('Waiting Time has expired',_id).subscribe((res) =>{
              this.refreshAssignmentList();
          });
          }
          left = 0;  
        }
      }
      //COUNTDOWN TUTORIAL=>https://www.npmjs.com/package/ngx-countdown
      this.configure.leftTime = left;
      return this.configure; 
    }
  }

  configureHos(status:string,actualArrival:Date,countEndTime:Date,_id:string)
  {
    var left;
    if(status == 'late')
    {
      //add 13hrs 30mins in the actual arrival
      var date = new Date(actualArrival);
      date.setHours(date.getHours() + 13);
      date.setMinutes(date.getMinutes() + 30);

      // var date2 = new Date(actualArrival);
      var date2 = new Date();
      
      //get difference of incremented date and actual arrival. The result will be in milliseconds
      var countDown = date.getTime() - date2.getTime(); 

      // console.log('Late countdown = '+countDown);
      //check if countdown milliseconds is less than or equal to 13:30 milliseconds (46800000 milliseconds)
      //AND also check if difference is not smaller than 0
      if( 48600000 >= countDown && countDown >= 0)
      {
        //convert countDown into seconds because countdown is in milliseconds
        left = (countDown/1000);
        // console.log('late left = '+left);
      }
      else{
        left = 0;

        if(countEndTime == null)
        {
          this.assignService.putCountEnd(date,_id).subscribe((res) =>{
            this.refreshAssignmentList();
        });
        }
      }
    }
    else
    {
      //add 12hrs 30mins in the actual arrival
      var date = new Date(actualArrival);
      date.setHours(date.getHours() + 12);
      date.setMinutes(date.getMinutes() + 30);

      // var date2 = new Date(actualArrival);
      var date2 = new Date();

      //get difference of incremented date and actual arrival. The result will be in milliseconds
      var countDown = date.getTime() - date2.getTime(); 

      // console.log('Schedule countdown = '+countDown);
      //check if countdown milliseconds is less than or equal to 12:30 milliseconds (46800000 milliseconds)
      //AND also check if difference is not smaller than 0
      if( 45000000 >= countDown && countDown >= 0)
      {
        //convert countDown into seconds because countdown is in milliseconds
        left = (countDown/1000);
        // console.log('Schedule left = '+left);
      }
      else{
        left = 0;

        if(countEndTime == null)
        {
          this.assignService.putCountEnd(date,_id).subscribe((res) =>{
            this.refreshAssignmentList();
        });
        }
      }
    }

    //COUNTDOWN TUTORIAL=>https://www.npmjs.com/package/ngx-countdown
    this.configure.leftTime = left;
    return this.configure;
  }
  
  constructor(public assignService: AssignService,public driverService: DriverService,public _user:UserService, public _router:Router,public modalService: ModalService) {
    this._user.user()
    .subscribe(
      data=>this.addName(data),
      error=>_router.navigate(['login'])
    );
   }

   logout()
   {
     this._user.logout()
     .subscribe(
       data=>{console.log(data); this._router.navigate(['/login'])},
       error=>console.error(error)
     );
   }
  ngOnInit() {
    //get all drivers 
    this.driverService.getDriverList().subscribe((res)=>{
      this.driverService.drivers = res as Driver[];
    });

    this.resetForm();
    this.refreshAssignmentList();
  }

  resetForm(form?:NgForm)
  {
    if(form)
      form.reset();

    this.assignService.assignment = {
      _id: '',
      name: '',
      code: '',
      appointmentTime: null,
      scheduledTime: null,
      actualArrival: null,
      status: null,
      departTime: null,
      hosCount: null,
      countEndTime: null,
      dropOffTime: null,
      duration: null,
      waitingTime: null,
      nextReset: null,
    };
  }

  refreshAssignmentList()
  {
    //get all driver assignments
    this.assignService.getAssignList().subscribe((res)=>{
      this.assignService.assignments = res as Assign[];
    });
  }
  addName(data)
  {
    this._user.isLoggedIn = true;
    this.username = data.username;
  }

  //Jw-modal Tutorial http://jasonwatmore.com/post/2018/05/25/angular-6-custom-modal-window-dialog-box 
  //modal box
  openModal(id: string,assignment:Assign) 
  {
    if(assignment)
    {
      this.assignService.assignment = assignment;
      //if you do not do this below you will not be able to show editable time in edit form
      //this.date = assignment.appointmentTime.toISOString().slice(0,16);
      // console.log(assignment.appointmentTime);
      // this.date = new Date(assignment.appointmentTime).toISOString().slice(0,16);

      var date1 = new Date(assignment.appointmentTime);
      date1.setUTCHours(date1.getHours());
      this.date = date1.toISOString().slice(0,16)

    }
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  //modal box for actual arrival time
  openModalArrival(id: string,assignment:Assign) {
    this.modalService.open(id);
    this.assignService.assignment = assignment;

  }

  //modal box for actual departure time
  openModalDeparture(id: string,assignment:Assign) {
    this.modalService.open(id);
    this.assignService.assignment = assignment;

  }

    //modal box for actual departure time
    openModalDropOff(id: string,assignment:Assign) {
      this.modalService.open(id);
      this.assignService.assignment = assignment;
  
    }
  
    //convert milliseconds into hrs mins secs
    convert(time:any)
    {
      if(time != null)
      {
        //hours and minutes 
        var diffHrs = Math.floor((time % 86400000) / 3600000); // hours
        var diffMins = Math.round(((time % 86400000) % 3600000) / 60000); // minutes
        var diffSecs = Math.round(((time % 86400000) % 3600000) / 60000 / 60000); // seconds

        return diffHrs + ':' + diffMins + ':' + diffSecs;
      }
    }

  onSubmit4(form:NgForm){
    
      var time1 = new Date(form.value.departTime);
      var time2 = new Date(form.value.dropOffTime);

      console.log("time1 = "+time1); 
      console.log("time2 = "+time2); 
      //this will store in the form of milliseconds
      form.value.duration = time2.getTime() - time1.getTime(); 
      console.log(form.value.duration); 

      //this will show milliseconds into hrs mins secs
      console.log(this.convert(form.value.duration));

      // var time3 = new Date(form.value.duration);
      // console.log(time3);
    
      this.assignService.putDropOff(form.value).subscribe((res) =>{
      this.refreshAssignmentList();
      M.toast({html: 'Updated Successfully',classes: 'rounded'});
    });

  }

  onSubmit3(form:NgForm){
    
    this.assignService.putDepart(form.value).subscribe((res) =>{
    this.refreshAssignmentList();
    M.toast({html: 'Updated Successfully',classes: 'rounded'});
  });

}

  onSubmit2(form:NgForm){

    var scheduled = new Date(form.value.scheduledTime);
    var arrived = new Date(form.value.actualArrival);

    //check if status of truck arrival
    if(arrived > scheduled)
      form.value.status = 'late';
    else
      form.value.status = 'on scheduled';

    //set next reset
    var date = new Date(form.value.actualArrival);
    date.setHours(date.getHours() + 23);
    date.setMinutes(date.getMinutes() + 30);
    form.value.nextReset = date;
    
      this.assignService.putAssign(form.value).subscribe((res) =>{
      this.refreshAssignmentList();
      M.toast({html: 'Updated Successfully',classes: 'rounded'});
    });

  }

  onSubmit(form:NgForm){

    if(form.value._id == "" || form.value._id == null)
    {
      console.log('Apointment Time = ' + form.value.appointmentTime+' Fullname = ' + form.value.driver);
      var date = new Date(form.value.appointmentTime);
      date.setHours(date.getHours() - 1);
      console.log('1 hour prior = '+date);

      // var date2 = date.toString();
      this.formValues = new Assign(form.value.name,form.value.code,form.value.appointmentTime , date);

      this.assignService.postAssign(this.formValues).subscribe((res) =>{
        this.refreshAssignmentList();
        M.toast({html: 'Saved Successfully',classes: 'rounded'});
      });
    }
    else
    {
      var date = new Date(form.value.appointmentTime);
      date.setHours(date.getHours() - 1);
      console.log('1 hour prior = '+date);
      console.log('name '+form.value.name);
      console.log('scheduled time = '+form.value.scheduledTime);
      form.value.scheduledTime = date;
      console.log('scheduled time = '+form.value.scheduledTime);
      this.assignService.putAssignEdit(form.value).subscribe((res) =>{
        this.resetForm(form);
        this.refreshAssignmentList();
        M.toast({html: 'Updated Successfully',classes: 'rounded'});
      });
    }
  }

  onAssignment(driver:Assign)
  {this.assignService.assignment = driver;}

  deleteAssignment(_id:string){
    if(confirm('Are you sure to delete this record?')==true)
      this.assignService.deleteAssign(_id).subscribe((res)=>{
        this.refreshAssignmentList();
        M.toast({html: 'Deleted Successfully',classes: 'rounded'});
      });
  }
}
