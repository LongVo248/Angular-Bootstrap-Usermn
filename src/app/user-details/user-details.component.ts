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

  userName!: string;
  user: User = new User;
  constructor(private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit(): void {
    this.userName = this.route.snapshot.params['userName'];

    this.user = new User();
    this.userService.getUserByUsername(this.userName).subscribe( data => {
      this.user = data;
    });
  }
}
