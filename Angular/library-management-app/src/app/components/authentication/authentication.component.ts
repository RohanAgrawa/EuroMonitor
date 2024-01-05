import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { UserModel } from '../../models/user.model';
import { Observable } from 'rxjs';
import { UserResponseModel } from '../../models/userResponse.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-box/dialog-content.component';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.css'
})
export class AuthenticationComponent implements OnInit{

  @ViewChild('f') public userForm: NgForm;
  public isSubmitted: boolean = false;
  public isSubmittedError: boolean = false;
  public adminId: string = '';
  public isLoginMode: boolean = true;
  
  constructor(private authService : AuthenticationService, private routes : Router, private dialog : MatDialog) {
  }


  public ngOnInit(): void{
    
  }

  public onSwitchMode() : void{
    this.isLoginMode = !this.isLoginMode;
  }

  public onSubmit(): void {

    if (!this.userForm.valid) {
      return;
    }

    let authObs: Observable<UserResponseModel>;

    if (this.isLoginMode) {
      authObs = this.authService.login(this.userForm.value.email, this.userForm.value.password);
    }
    else {
      const admin = new UserModel(this.userForm.value.username, this.userForm.value.mobile, this.userForm.value.email, this.userForm.value.password, 'ADMIN')
      authObs = this.authService.signUp(admin);
    }

    authObs.subscribe((response) => {
      this.userForm.resetForm();
      this.routes.navigate(['/dashboard', 'books']);
    }, (error) => {
      this.openDialog();
    });
  }

  private openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);
  }
}
