import {
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  ViewChild
} from '@angular/core';
import { UserModel } from '../../../models/user.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

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

  constructor(private userService: UserService, private route : ActivatedRoute, private routes : Router) {
   
  }

  public ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.userType = params['userType'];
        this.checkUserType();
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

  private checkUserType(): void {
    if(this.userType == 'admin' || this.userType == 'adminUpdated')
        this.getAdimnUsers();
      else
        this.getUsers();
  }

  public onDelete(user: any): void{
 
    if (this.userType == 'admin' || this.userType == 'adminUpdated')
      this.deleteAdmin(user);
    else
      this.deleteUser(user);
  }

  private deleteAdmin(user: any): void {
    this.userService.deleteAdmin(user.id).then((response) => {
      if (response.ok) {
        this.checkUserType();
      }
      else {
        console.log('Error deleting admin');
      }
    });
  }

  private deleteUser(user: any): void {
    this.userService.deleteUser(user.id).then((response) => {
      if (response.ok) {
        this.checkUserType();
      }
      else {
        console.log('Error deleting user');
      }
    });
  }

  public onNavigate(user: any): void{
    
    if(this.userType == 'admin' || this.userType == 'adminUpdated')
      this.routes.navigate([user.id,'update','admin'], {relativeTo : this.route, queryParams : {userType : 'admin'}, queryParamsHandling: 'merge'});
    else
    this.routes.navigate([user.id,'update'], {relativeTo : this.route, queryParams : {userType : 'public'}, queryParamsHandling: 'merge'});
  }
}
