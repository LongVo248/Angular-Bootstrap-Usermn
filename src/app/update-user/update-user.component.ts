import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  userName: string='';
  user: User = new User;

  constructor(private route: ActivatedRoute, private router: Router,
    private userService: UserService) { }

  ngOnInit() {
    this.user = new User();

    this.userName = this.route.snapshot.params['userName'];

    this.userService.getUser(this.userName)
      .subscribe(data => {
        console.log(data)
        this.user = data;
      }, error => console.log(error));
  }

  updateUser() {
    this.userService.updateUser(this.userName, this.user)
      .subscribe(data => {
        console.log(data);
        this.user = new User();
        this.gotoList();
      }, error => console.log(error));
  }

  onSubmit() {
    this.updateUser();
  }

  gotoList() {
    this.router.navigate(['/users']);
  }

}
