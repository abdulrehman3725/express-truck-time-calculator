import {
  Component
} from '@angular/core';
import {
  UserService
} from './user.service';
import {
  Router
} from '@angular/router';
import {
  ViewChild,
  ElementRef
} from '@angular/core';
import * as M from "materialize-css/dist/js/materialize";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn: Boolean;

  constructor(private _user: UserService, private _router: Router) {}

  ngOnInit() {
    // this._user.user()
    //   .subscribe(
    //     data => {
    //       this.isLoggedIn = true
    //     },
    //     error => {
    //       this.isLoggedIn = false
    //     }
    //   );
  }

  logout() {
    this._user.logout()
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.error(error)
      );
  }

  title = 'app';
}
