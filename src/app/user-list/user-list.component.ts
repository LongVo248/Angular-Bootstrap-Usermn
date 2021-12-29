import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users!: Observable<User[]>;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.reloadData();
  }

  reloadData() {
    this.users = this.userService.getUsersList();
  }

  deleteUser(userName: string) {
    this.userService.deleteUser(userName)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  userDetails(userName: string) {
    this.router.navigate(['details', userName]);
  }

  updateUser(userName: string){
    this.router.navigate(['update-user', userName]);
  }
}
