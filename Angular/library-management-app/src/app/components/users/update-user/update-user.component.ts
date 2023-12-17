import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent implements OnInit{

  @ViewChild('f') public userForm: NgForm;

  public query: string;
  public id: string;

  constructor(private route : ActivatedRoute, private userService : UserService){ }
  
  public ngOnInit(): void {
    this.query = this.route.snapshot.queryParams['userType'];

    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.userService.getUser(+this.id).then((data) => {
        this.userForm.setValue({
          username: data.name,
          email: data.email,
          mobile: data.phone_no,
        });
      });
    });
  }

  public onsubmit() : void{
    console.log(this.userForm.value);
  }

  

}
