import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  userName: string='';
  user: User = new User;

  constructor(private route: ActivatedRoute,private router: Router,
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

  list(){
    this.router.navigate(['users']);
  }
}
