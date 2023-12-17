import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent implements OnInit{

  @ViewChild('f') public userForm: NgForm;
  public isSubmitted: boolean = false;
  public isSubmittedError: boolean = true;
  public userResponse: UserModel;

  constructor(private userService : UserService) {
  }

  ngOnInit() {

  }

  public onsubmit() : void{

    const user : UserModel = new UserModel(this.userForm.value.username,
                                              this.userForm.value.mobile, this.userForm.value.email, this.userForm.value.password);

    const response : Promise<any> =  this.userService.addAdmin(user);

    response.then((response :Response) => {
      if (response.ok) {
        this.isSubmittedError = false
        response.json().then((data) => {
          this.userResponse = data;
        });
        this.userForm.resetForm();
      }

      this.isSubmitted = true;
    });
  }

}
