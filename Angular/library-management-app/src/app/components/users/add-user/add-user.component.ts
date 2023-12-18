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
  public isSubmittedError: boolean = true;
  public userResponse: UserModel;

  constructor(private userService : UserService) {
  }

  ngOnInit() {

  }

  public onsubmit() : void{

    const user : UserModel = new UserModel(this.userForm.value.username.toUpperCase(),
                                              this.userForm.value.mobile, this.userForm.value.email.toUpperCase());

    const response : Promise<any> =  this.userService.addUser(user);

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
