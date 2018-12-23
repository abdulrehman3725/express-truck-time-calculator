import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { DriverComponent } from './driver/driver.component';
import { AppRoutingModule } from './/app-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserhomeComponent } from './userhome/userhome.component';
import {UserService} from './user.service';
import { ModalService } from './_services';
import {ModalComponent} from './_directives';
import { CountdownModule } from 'ngx-countdown';
@NgModule({
  declarations: [
    ModalComponent,
    AppComponent,
    DriverComponent,
    LoginComponent,
    RegisterComponent,
    UserhomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    CountdownModule
  ],
  providers: [UserService,ModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
