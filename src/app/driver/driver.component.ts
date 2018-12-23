import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

import {DriverService} from '../shared/driver.service';
import {Driver} from '../shared/driver.model';
import { from } from 'rxjs';
// import { UserService } from '../user.service';
// import { Router } from '@angular/router';

declare var M:any;

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css'],
  providers:[DriverService]
})
export class DriverComponent implements OnInit {

  constructor(private driverService: DriverService/*, private _user:UserService, private _router:Router*/) {
    // this._user.user()
    // .subscribe(
    //   data=>console.log(data),
    //   error=>_router.navigate(['login'])
    // );
   }


  ngOnInit() {
    this.resetForm();
    this.refreshDriverList();
  }

  resetForm(form?:NgForm)
  {
    if(form)
      form.reset();
    
      this.driverService.selectedDriver = {
        _id: '',
        name: '',
      };

  }

  onSubmit(form:NgForm)
  {
    if(form.value._id == "" || form.value._id == null)
    {
      this.driverService.postDriver(form.value).subscribe((res) =>{
        this.resetForm(form);
        this.refreshDriverList();
        M.toast({html: 'Saved Successfully',classes: 'rounded'});
      });
    }  
    else
    {
      this.driverService.putDriver(form.value).subscribe((res) =>{
        this.resetForm(form);
        this.refreshDriverList();
        M.toast({html: 'Updated Successfully',classes: 'rounded'});
      });
    }

  }

  refreshDriverList()
  {
    this.driverService.getDriverList().subscribe((res)=>{
      this.driverService.drivers = res as Driver[];
    });
  }

  onEdit(driver:Driver)
  {this.driverService.selectedDriver = driver;}

  onDelete(_id:string, form:NgForm)
  {
    if(confirm('Are you sure to delete this record?')==true)
      this.driverService.deleteDriver(_id).subscribe((res)=>{
        this.refreshDriverList();
        this.resetForm(form);
        M.toast({html: 'Deleted Successfully',classes: 'rounded'});
      });
  }
}
