import { Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";
import { UserModel } from '../../../models/user.model';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/animations';
import { merge } from 'rxjs';

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

  constructor(private userService : UserService, private routes : ActivatedRoute, private route : Router) {
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
      this.route.navigate(['/dashboard', 'users'], {queryParams : {userType : 'public'}, queryParamsHandling : 'merge'})
    }, (err) => {
      this.isSubmittedError = true;
    });
    
  }
}
