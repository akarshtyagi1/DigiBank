import { Component } from '@angular/core';
import { UserService } from './core/service/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'digibank-prototype';

  constructor(private userService: UserService) {
    console.log(userService.getUsers());
  }
}
