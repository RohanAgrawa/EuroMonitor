import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../../../models/user.model';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-update-admin-user',
  templateUrl: './update-admin-user.component.html',
  styleUrl: './update-admin-user.component.css'
})
export class UpdateAdminUserComponent implements OnInit{

  @ViewChild('f') public userForm: NgForm;

  public query: string;
  public id: string;
  public responseError: boolean = false;

  constructor(private route : ActivatedRoute, private userService : UserService, private routes : Router){ }
  
  public ngOnInit(): void {

    this.query = this.route.snapshot.queryParams['userType'];

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.userService.getAdmin(+this.id).then((data) => {
        this.userForm.setValue({
          username: data.name,
          email: data.email,
          mobile: data.phone_no,
          password: data.password
        });
      });
    });
  }

  public onUpdate(): void{
    
    const updatedUser = new UserModel(this.userForm.value.username, this.userForm.value.mobile,
                                        this.userForm.value.email, this.userForm.value.password); 
    
    this.userService.updateAdmin(+this.id, updatedUser).then((response) => {

      if (response.ok) {
        this.routes.navigate(['/users'], { queryParams: { userType: this.query + "Updated" }, queryParamsHandling: 'merge' , fragment : this.id});
      }
      else{
        this.responseError = true;
      }
    });
  }
}
