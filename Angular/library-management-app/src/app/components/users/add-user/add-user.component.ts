import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";
import { UserModel } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.css'
})
export class AddUserComponent implements OnInit{

  @ViewChild('f') public userForm: NgForm;
  public isSubmitted: boolean = false;
  public isSubmittedError: boolean = false;
  public userResponse: UserModel;
  public selectedUser: string = '';
  public publicUserId: string = '';

  public userRoles = [{key : 'Admin', value : 'ADMIN'},{ key : 'Public', value : 'PUBLIC'}];

  constructor(private userService : UserService) {
  }

  ngOnInit() {
  }

  public onsubmit() : void{

    const user : UserModel = new UserModel(this.userForm.value.username.toUpperCase(),
                                              this.userForm.value.mobile, this.userForm.value.email.toUpperCase(), 'PUBLIC');

    const response = this.userService.addUser(user);
    this.isSubmitted = true;

    response.subscribe((userData) => {
      this.isSubmittedError = false;
      this.publicUserId = userData.id;
      this.userForm.resetForm();
    }, (err) => {
      this.isSubmittedError = true;
    });
    
  }
}
