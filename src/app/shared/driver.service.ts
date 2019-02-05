import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Driver} from './driver.model';

@Injectable()
export class DriverService {
  selectedDriver: Driver;
  drivers: Driver[];

  readonly baseUrl = 'http://3.16.214.113:8080/drivers';


  constructor(private http: HttpClient) { }

  postDriver(driver:Driver){
    return this.http.post(this.baseUrl, driver);
  }

  getDriverList()
  {
    return this.http.get(this.baseUrl);
  }

  putDriver(driver:Driver)
  {
    return this.http.put(this.baseUrl + `/${driver._id}`,driver);
  }

  deleteDriver(_id:string)
  {
    return this.http.delete(this.baseUrl + `/${_id}`);
  }
}
