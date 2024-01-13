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
import { DialogContentComponent } from '../../dialog-box/dialog-content.component';
import { MatDialog } from '@angular/material/dialog';

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

  constructor(private userService: UserService, private route : ActivatedRoute, private routes : Router, private dialog : MatDialog) {
  }

  public ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.userType = params['userType'];
      this.getUsers();
    });
  }

  private getUsers() : void{
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
      this.dataSource = new MatTableDataSource<UserModel>(this.users);
      this.dataSource.paginator = this.paginator;
    }, (error) => { this.openDialog();});
  }

  public applyFilter(event: Event): void {
    let filteredValue = (event.target as HTMLInputElement).value;
    filteredValue = filteredValue.trim().toUpperCase();
    this.dataSource.filter = filteredValue;
  }

  public onDelete(user: any): void{
      this.deleteUser(user);
  }

 
  private deleteUser(user: any): void {
    this.userService.deleteUser(user.id).subscribe((response) => {
      this.getUsers();
    }, (error) => { this.openDialog();});
  }

  public onNavigate(user: any): void{
    
    this.routes.navigate([user.id,'update'], {relativeTo : this.route, queryParams : {userType : 'public'}, queryParamsHandling: 'merge'});
  }

  private openDialog() {
    const dialogRef = this.dialog.open(DialogContentComponent);
  }
}
