import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { UserModel } from '../../../models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../../dialog-box/dialog-content.component';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{

  @ViewChild('f') public userForm: NgForm;

  public query: string;
  public id: string;
  public responseError: boolean = false;

  constructor(private route : ActivatedRoute, private userService : UserService, private routes : Router, private dialog : MatDialog){ }
  
  public ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['userType'];

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.userService.getUser(+this.id).subscribe((data) => {
        
        if (this.userForm) {
          this.userForm.setValue({
            username: data.name,
            email: data.email,
            mobile: data.phone_no,
            
          });
        }
        
      });
    });
  }

  public onUpdate() : void{
    const updatedUser = new UserModel(this.userForm.value.username, this.userForm.value.mobile,
                                        this.userForm.value.email); 

      this.userService.updateUser(+this.id, updatedUser).subscribe((response) => {
  
        this.routes.navigate(['dashboard','users'], { queryParams: { userType: this.query + "Updated" }, queryParamsHandling: 'merge' , fragment : this.id});
      }, (error) => { 
        this.openDialog();
      });
  }

  private openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);
  }
  

}
