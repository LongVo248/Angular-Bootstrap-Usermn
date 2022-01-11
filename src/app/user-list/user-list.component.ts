import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../services/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  user: User[] = [];
  indexPagination: number = 1;
  listUserNotPagination: User[] = [];
  totalPagination: number = 0;
  public searchUser: FormGroup = new FormGroup({});

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
    this.searchUser = new FormGroup({
      username: new FormControl(''),
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      email: new FormControl('')
    });
    this.userService.getAllUserNotPagination().subscribe((data: any) => {

      this.listUserNotPagination = data;

      console.log("tong user ", (this.listUserNotPagination.length -(this.listUserNotPagination.length%5))/5 + 1);
      if ((this.listUserNotPagination.length % 5) === 0) {
        this.totalPagination = this.listUserNotPagination.length / 5;
      }else if((this.listUserNotPagination.length % 5) != 0){

        this.totalPagination = (this.listUserNotPagination.length -(this.listUserNotPagination.length%5))/5 + 1;
      }
    })
    console.log("tong trang ", this.totalPagination);
  }
  getValue(event: Event): number {
    return Number((event.target as HTMLInputElement).value);
  }

  private getUsers() {
    this.userService.getUserList(0).subscribe((data:any) => {
      this.user = data.content;
    });
  }

  userDetails(userName: string) {
    this.router.navigate(['user-details', userName]);
  }

  updateUser(userName: string) {
    this.router.navigate(['update-user', userName]);
  }

  deleteUser(userName: string) {
    this.userService.deleteUser(userName).subscribe(data => {
      console.log(data);
      this.getUsers();
    })
  }

  search(){

    if ((this.searchUser.value.username.length === 0) &&
      (this.searchUser.value.firstname.length === 0) &&
      (this.searchUser.value.lastname.length === 0) &&
      (this.searchUser.value.email.length === 0)) {
        this.userService.getUserList(0).subscribe((data: any) =>{
          this.user = data.users;
        })
    } else {
      this.userService.searchUser(this.searchUser.value.username,
        this.searchUser.value.firstname,
        this.searchUser.value.lastname,
        this.searchUser.value.email).subscribe((data: any) => {
          console.log("User User", data);
          return this.user = data;
        });
      console.log("username ", this.searchUser.value.username);
      console.log("firstname ", this.searchUser.value.firstname);
      console.log("lastname ", this.searchUser.value.lastname);
      console.log("email ", this.searchUser.value.email);
    }
  }
  findPaginnation() {
    this.userService.getUserList(this.indexPagination - 1).subscribe((data: any) => {
      this.user = data.users;
    })
  }

  indexPaginationChage(value: number) {
    this.indexPagination = value;
  }

  firtPage() {
    this.indexPagination = 1;
    this.ngOnInit();
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    console.log("indexPagination ", this.indexPagination);
    console.log("totalPagination ", this.totalPagination);
    if (this.indexPagination > (this.totalPagination)) {
      this.indexPagination = this.totalPagination;
    }
    this.userService.getUserList(this.indexPagination - 1).subscribe((data: any) => {
      this.user = data.content;
    })
  }

  prviousPage() {
    if(this.indexPagination>0){
      this.indexPagination = this.indexPagination - 1;
      console.log("indexPagination ", this.indexPagination);
      console.log("totalPagination ", this.totalPagination);
      if (this.indexPagination == 0) {
        this.indexPagination = 1;
        this.ngOnInit();
      } else {
        this.userService.getUserList(this.indexPagination - 1).subscribe((data: any) => {
          console.log(this.indexPagination);
          this.user = data.content;
        })
      }
    }

  }

  lastPage() {
    this.indexPagination = this.totalPagination;
    this.userService.getUserList(this.indexPagination - 1).subscribe((data: any) => {
      console.log("trang ", this.indexPagination);
      console.log("tong trang ", this.totalPagination);
      this.user = data.content;
    })
  }
}
