import {
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  ViewChild
} from '@angular/core';
import { UserModel } from '../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent implements OnInit{
  
  public displayedColumns: string[] = ['id', 'name', 'email', 'phone_no', 'edit', 'delete'];

  public dataSource: MatTableDataSource<UserModel>;

  public users: UserModel[];
  public adminUsers: UserModel[];
  public userType: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private userService: UserService, private route : ActivatedRoute) {
   
  }

  public ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.userType = params['userType'];
      if(this.userType == 'admin')
        this.getAdimnUsers();
      else
        this.getUsers();
    });
    
  }

  private getAdimnUsers()  : void{
    this.userService.getAdmins().then((data) => {
      this.adminUsers = data;
      this.dataSource = new MatTableDataSource<UserModel>(this.adminUsers);
      this.dataSource.paginator = this.paginator;
    });
  }

  private getUsers() : void{
    this.userService.getUsers().then((data) => {
      this.users = data;
      this.dataSource = new MatTableDataSource<UserModel>(this.users);
      this.dataSource.paginator = this.paginator;
    });
  }

  public onUpdate(user: UserModel) : void{
    
  }

  public onDelete(user: any): void{
 
    this.userService.deleteUser(this.userType, user.id).then((response) => {
      if (response.ok) {
        if(this.userType == 'admin')
          this.getAdimnUsers();
        else
          this.getUsers();
      }
      else {
        console.log('Error deleting user');
      }
    });
  }
}
