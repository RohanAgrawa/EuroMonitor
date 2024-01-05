import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { publicAuthenticationService } from '../../services/public-authentication.service';
import { DialogContentComponent } from '../dialog-box/dialog-content.component';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrl: './public.component.css'
})
export class PublicComponent {

  @ViewChild('f') public userForm: NgForm;


  constructor(private authService: publicAuthenticationService, private routes: Router, private dialog: MatDialog) {
  }

  public onSubmit() : void{
    
    if (!this.userForm.valid) {
      return;
    }

    this.authService.logIn(this.userForm.value.email, this.userForm.value.password).subscribe((response) => {
      this.userForm.resetForm();
      console.log(response);
      this.routes.navigate(['/public-dashboard']);
    }, (error) => {
      this.openDialog();
    });
  }

  private openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);
  }
}
